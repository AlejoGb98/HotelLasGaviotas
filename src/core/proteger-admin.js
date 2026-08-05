function obtenerAdministradorActivo() {
  var sesionGuardada = sessionStorage.getItem(
    "administradorActivo"
  );

  if (sesionGuardada == null) {
    return null;
  }

  return JSON.parse(sesionGuardada);
}

function cerrarSesion() {
  sessionStorage.removeItem("administradorActivo");
  window.location.href = "./index.html";
}

var administradorActivo = obtenerAdministradorActivo();

if (administradorActivo == null) {
  alert("Debe iniciar sesión como administrador.");

  window.location.href = "./login.html";
} else {
  document.addEventListener("DOMContentLoaded", function () {
    var nombreAdministrador = document.querySelector(
      "#nombre-administrador"
    );

    if (nombreAdministrador != null) {
      nombreAdministrador.textContent =
        administradorActivo.nombre;
    }

    var botonCerrarSesion = document.querySelector(
      "#cerrar-sesion"
    );

    if (botonCerrarSesion != null) {
      botonCerrarSesion.addEventListener("click", cerrarSesion);
    }
  });
}
