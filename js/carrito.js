function ingresarProducto(ProductoSeleccionado) {

	let {id, producto, precio} = ProductoSeleccionado;
	let cantidad = parseInt($(`.cantidadProd${ id }`).val());
	let carritoTabla = [];
	let cantActual = validarCantMax(id, carrito);
	let validaStock = cantidad + cantActual


	if (cantActual < 10 && validaStock <= 10) {

		for (i = 0; i < cantidad; i++) {

			carrito.push(ProductoSeleccionado);
			totalCarrito.push(precio);
			contadorCarrito += +1;

		}
		aPagar = calculaTotalAPagar(totalCarrito);
		$("#aPagar").html(aPagar.toFixed(2));
		avisoProducto.empty();
		avisoProducto.append(productoAgregado(producto, cantidad, precio));
		$("#modalProducto").modal("show");
		$(`.cantidadProd${ id }`).val(1)
		$(".contadorCarrito").text(contadorCarrito);
		let carritoAcumulado = agruparSumar(carrito, ['id', 'producto'], ['cantidad', 'precio']);
		$.each(carritoAcumulado, function (index, elemento) {

			let {id, producto, cantidad, precio} = elemento;
			let items = [insertarFilaConProducto(id, producto, cantidad, precio)];
			carritoTabla.push(items);
		});
		actualizarTabla(carritoTabla);
		registrarCarrito();
	} else {
		avisoProducto.empty();
		avisoProducto.append(`
		Para garantizar el stock limitamos la cantidad de un mismo producto hasta 10 unidades por compra. Actualmente posees ${cantActual}. Revisa y agrega nuevamente.
		`)
		$("#modalProducto").modal("show");
		$(`.cantidadProd${ id }`).val(10 - cantActual);		
	}
}


function registrarCarrito() {

	carritoJSON = JSON.stringify(carrito);
	localStorage.setItem("carrito", carritoJSON);
	localStorage.setItem("total", aPagar);

}

function eliminarProducto(idProducto) {

	carrito = carrito.filter(item => item.id !== idProducto)
	totalCarrito = [];
	carrito.forEach(valor => {
		totalCarrito.push(valor["precio"]);
	});
	aPagar = calculaTotalAPagar(totalCarrito);
	$("#aPagar").html(aPagar.toFixed(2));
	registrarCarrito();
	$(".tableBody").empty();
	recuperarCarrito();
	contadorCarrito = carrito.length;
	$(".contadorCarrito").text(contadorCarrito);
	$(`.cantidadProd${ idProducto }`).val(1);
}

function vaciarCarrito() {
	
		carrito = [];
		totalCarrito = [];
		aPagar = 0;
		contadorCarrito = 0;
		$(".contadorCarrito").text(contadorCarrito);
		$("#aPagar").html(aPagar);
		$(".tableBody").empty();
		localStorage.removeItem("carrito");
		localStorage.removeItem("total");
		$("[class^=cantidadProd]").val(1);
}

function finalizarCarrito() {

	if (usuarioActivo.length === 0) {

		btnVaciar.hide();
		AlertaRegistroCompra.html("Debes estar registrado para poder finalizar la compra.");


	} else if (aPagar === 0 || totalCarrito.length === 0) {

		btnVaciar.hide();
		AlertaRegistroCompra.html("Debes tener al menos 1 producto en el carrito para poder finalizar la compra.");


	} else {

		aPagar = calculaTotalAPagar(totalCarrito);
		$("#aPagar").html(aPagar.toFixed(2));
		btnVaciar.show();
		AlertaRegistroCompra.html(`${usuarioActivo['nombre']}, el total a pagar es <span style="font-weight: bold; color: green;">$${ aPagar.toFixed(2) }</span>. Enviaremos un detalle del pedido al correo: <span style="font-weight: bold">${usuarioActivo['email']}</span> en el cual encontrarás un link para continuar con el proceso de compra. Presiona 'Finalizar' para confirmar tu pedido o 'Cerrar' para continuar editando.`);

	}
}

function recuperarCarrito() {


	if (localStorage.carrito !== undefined) {

		carrito = JSON.parse(localStorage.carrito);
		let carritoTabla = [];
		let carritoAcumulado = agruparSumar(carrito, ['id','producto'], ['cantidad', 'precio']);
		$.each(carritoAcumulado, function (index, elemento) {

			let {id, producto, cantidad, precio} = elemento;
			let items = [insertarFilaConProducto(id, producto, cantidad, precio)];
			carritoTabla.push(items);
		});
		actualizarTabla(carritoTabla);
		$("#aPagar").html((JSON.parse(localStorage.total)).toFixed(2));
		contadorCarrito = carrito.length;
		$(".contadorCarrito").text(contadorCarrito);
		totalCarrito = [parseFloat(JSON.parse(localStorage.total))];
	}
}


