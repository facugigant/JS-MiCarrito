class Usuario {
	constructor(nombre, apellido, email) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
	}
}

function abrirRegistro() {

	$("#registroUsuario").modal("show");

}

function CrearUsuario() {
	
	let nombreRegistro = $("#nombreRegistro").val();
	let apellidoRegistro = $("#apellidoRegistro").val();
	let emailRegistro = $("#emailRegistro").val();

	if (nombreRegistro === "" || apellidoRegistro === "" || emailRegistro === "") {

		faltanDatos();

	} else if (validaCorreoElectronico(emailRegistro) === false) {

		correoInvalido();

	} else {

		let usuarioNuevo = new Usuario(nombreRegistro, apellidoRegistro, emailRegistro);

		registrarUsuarioSession(usuarioNuevo);
		registroExitoso();
	}
}



function registrarUsuarioSession(usuarioNuevo) {

	let {nombre, apellido} = usuarioNuevo;
	let usuarioNuevoJSONSession = JSON.stringify(usuarioNuevo);

	localStorage.setItem("usuarios", usuarioNuevoJSONSession);
	usuarioActivo = usuarioNuevo;
	$("#nombreUsuario").html(`${ apellido }, ${ nombre }`);
	$(".usuarioLogged").show();
	$("#CrearUsuario").prop('disabled', true);

}

function reestableceSesion() {
	
	if (localStorage.usuarios !== undefined) {
		
		usuarioActivo = JSON.parse(localStorage.getItem("usuarios"));
		let {nombre, apellido} = usuarioActivo;
		$("#nombreUsuario").html(`${ apellido }, ${ nombre }`);
		$(".usuarioLogged").show();
		$("#CrearUsuario").prop('disabled', true);
	}
}

function cerrarSesion() {

	if (usuarioActivo.length === 0) {

		btnCerrarSesion.text("No hay una sesión activa para cerrar.");

	} else {

		localStorage.removeItem("usuarios");
		usuarioActivo = [];
		$("#CrearUsuario").prop('disabled', false);
		$(".usuarioLogged").hide();
		$("#nombreUsuario").html("");
		btnCerrarSesion.text("has finalizado tu sesión.");

	}
}





