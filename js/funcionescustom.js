//HTML 

function bajarAlCarrito () {

    $('html, body').animate({
        scrollTop: $("#carritoBottom").offset().top
      });

}

function refuerzaMinyMaX(cant){
  if(cant.value != ""){
    if(parseInt(cant.value) < parseInt(cant.min)){
      cant.value = cant.min;
    }
    if(parseInt(cant.value) > parseInt(cant.max)){
      cant.value = cant.max;
    }
  }
}

// Usuario

function validaCorreoElectronico(email) {

	let validaMail = /\S+@\S+\.\S+/;
	return validaMail.test(email);

}

function faltanDatos () {

  avisoRegistro.text("No has ingresado todos los datos requeridos, verifica y vuelve a intentar.");
  btnVerificar.show();
  $("#modalAviso").modal("show");

}

function correoInvalido () {

  avisoRegistro.text("El formato del correo electrónico es incorrecto. Verifica y vuelve a intentar.");
  btnVerificar.show();
  $("#modalAviso").modal("show");

}

function registroExitoso () {

  avisoRegistro.text("Registro exitoso.");
  btnVerificar.hide();
  $("#modalAviso").modal("show");
  $("[id$=Registro]").val("");

}

// Carrito

const validarCantMax = (IdProd, carrito) => carrito.filter((obj) => obj.id === IdProd).length;
const calculaTotalAPagar = (totalCarrito) => parseFloat(totalCarrito.reduce((a, b) => a + b, 0).toFixed(2));

function agruparSumar(arr, groupKeys, sumKeys){
  return Object.values(
    arr.reduce((acc,curr)=>{
      const group = groupKeys.map(k => curr[k]).join('-');
      acc[group] = acc[group] || Object.fromEntries(groupKeys.map(k => [k, curr[k]]).concat(sumKeys.map(k => [k, 0])));
      sumKeys.forEach(k => acc[group][k] += curr[k]);
      return acc;
    }, {})
  );
}

function actualizarTabla (carritoTabla) {
  $(".tableBody").empty();
  $(".tableBody").append(carritoTabla);
}

function productoAgregado (producto, cantidad, precio) {
  return `Se agregó <span style="font-weight: bold;">${ producto }</span> - <span style="font-weight: bold;color: orangered;">Cantidad: ${ cantidad }</span> por <span style="font-weight: bold;color: green;">$${ (precio * cantidad).toFixed(2) }</span> a su carrito.`;
}

function insertarFilaConProducto (id, producto, cantidad, precio) {
  return `<tr>
            <td>
              ${ producto }
            </td>
            <td>
            <span style="font-weight: bold;color: orangered;">Cantidad:</span> ${ cantidad }
            </td>
            <td>
              <span style="font-weight: bold;color: green;">Subtotal:</span> $${ precio.toFixed(2) }
            </td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${ id })">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>	
              </button>
            </td>
          </tr>`;
}






