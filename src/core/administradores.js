var administradoresPrecargados = [
  {
    id: 1,
    nombre: "Santiago",
    usuario: "santiago",
    clave: "santiago123"
  },
  {
    id: 2,
    nombre: "Alejo",
    usuario: "alejo",
    clave: "alejo123"
  },
  {
    id: 3,
    nombre: "Fernando",
    usuario: "fernando",
    clave: "fernando123"
  },
  {
    id: 4,
    nombre: "Carolina",
    usuario: "admin",
    clave: "hotel"
  }
];

function precargarAdministradores() {
  var administradoresGuardados =
    localStorage.getItem("administradores");

  if (administradoresGuardados == null) {
    localStorage.setItem(
      "administradores",
      JSON.stringify(administradoresPrecargados)
    );
  }
}

function buscarAdministrador(usuario, clave) {
  var administradores = JSON.parse(
    localStorage.getItem("administradores")
  ) || [];

  return administradores.find(function (administrador) {
    return (
      administrador.usuario.toLowerCase() === usuario.toLowerCase() &&
      administrador.clave === clave
    );
  });
}

function iniciarSesion(usuario, clave) {
  var administrador = buscarAdministrador(usuario, clave);

  if (administrador == null) {
    return false;
  }

  var sesion = {
    id: administrador.id,
    nombre: administrador.nombre,
    usuario: administrador.usuario
  };

  sessionStorage.setItem(
    "administradorActivo",
    JSON.stringify(sesion)
  );

  return true;
}

precargarAdministradores();

var formularioLogin = document.querySelector("#form-login");

if (formularioLogin != null) {
  formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var usuario = formularioLogin.elements["usuario"].value.trim();
    var clave = formularioLogin.elements["clave"].value;
    var mensaje = document.querySelector("#mensaje-login");

    if (iniciarSesion(usuario, clave)) {
      window.location.href = "./reservas.html";
    } else {
      mensaje.textContent = "Usuario o contraseña incorrectos.";
      mensaje.className = "mensaje-error";
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    administradoresPrecargados,
    precargarAdministradores,
    buscarAdministrador,
    iniciarSesion
  };
}
