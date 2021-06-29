$(document).ready(function () {
  $.getJSON("./json/productos.json", function (data) {
    productos = data;
    let items = [];
    $.each(productos, function (index, elemento) {
      let { id, marca, producto, precio, categoria, tipo } = elemento;

      items = `
                <div class="col col-md-4 d-flex justify-content-center contenedorCard">
                    <div class="card border-primary" style="width: 18rem;">
                        <div class="imagenProducto">
                            <img src="./media/producto${id}.jpg" class="card-img-top" alt="...">
                            <p class="catProducto bg-${tipo} bg-gradient rounded-3">${categoria}</p>
                        </div>
                        <div class="card-header">
                            ${marca}
                        </div>
                        <div class="card-body">
                            <p class="card-text">${producto}</p>
                        </div>
                        <div class="card-footer d-grid gap-2">
                            <div>$${precio.toFixed(2)}</div>
                            <div style="font-size: 1rem;color: orangered;">
                                Cantidad:  
                                <input type="number" class="cantidadProdStyle cantidadProd${id}" id="quantity" name="quantity" value="1" min="1" max="10" onkeyup=refuerzaMinyMaX(this)>
                            </div>
                            <button type="button" class="btn btn-success bg-gradient" onclick="ingresarProducto(productos[${index}])">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            `;
      iniProductos.push(items);
    });
    $(".listadoProductos").append(iniProductos);
  });
});

reestableceSesion();
recuperarCarrito();
