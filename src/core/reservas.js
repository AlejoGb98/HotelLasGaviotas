var reservas = [];

var formulario = document.querySelector(".booking-form");

var reservasGuardadas = localStorage.getItem("reservas");

if (reservasGuardadas != null) {
  reservas = JSON.parse(reservasGuardadas);
}

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (formulario.checkValidity() == false) {
      formulario.reportValidity();
      return;
    }

    var datosReserva = {
      nombre: formulario.elements["nombre"].value,
      telefono: formulario.elements["telefono"].value,
      correo: formulario.elements["correo"].value,
      llegada: formulario.elements["llegada"].value,
      salida: formulario.elements["salida"].value,
      habitacion: formulario.elements["habitacion"].value,
      personas: formulario.elements["personas"].value,
      observaciones: formulario.elements["observaciones"].value
    };

    var reservaCreada = crearReserva(datosReserva);

    if (reservaCreada != null) {
      alert(
        "Reserva registrada correctamente. Número de reserva: " +
        reservaCreada.id
      );

      formulario.reset();
    }
  });
}

function crearReserva(datos) {
  var reserva = {
    id: reservas.length + 1,
    nombre: datos.nombre,
    telefono: datos.telefono,
    correo: datos.correo,
    llegada: datos.llegada,
    salida: datos.salida,
    habitacion: datos.habitacion,
    personas: datos.personas,
    observaciones: datos.observaciones,
    estado: "Pendiente"
  };

  if (!validarMail(reserva.correo)) {
    alert("El correo electrónico no es válido.");
    return null;
  }

  if (!validarFechas(reserva.llegada, reserva.salida)) {
    alert("Las fechas ingresadas no son válidas.");
    return null;
  }

  agregarReserva(reserva);

  return reserva;
}

function validarMail(correo) {
  if (correo == null || correo == "") {
    return false;
  }

  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(correo);
}

function validarFechas(fechaLlegada, fechaSalida) {
  if (
    fechaLlegada == null ||
    fechaSalida == null ||
    fechaLlegada == "" ||
    fechaSalida == ""
  ) {
    return false;
  }

  var hoy = new Date();
  var anio = hoy.getFullYear();
  var mes = String(hoy.getMonth() + 1).padStart(2, "0");
  var dia = String(hoy.getDate()).padStart(2, "0");
  var fechaActual = anio + "-" + mes + "-" + dia;

  if (fechaSalida <= fechaLlegada) {
    return false;
  }

  if (fechaLlegada <= fechaActual || fechaSalida <= fechaActual) {
    return false;
  }

  return true;
}

function agregarReserva(reserva) {
  reservas.push(reserva);

  localStorage.setItem("reservas", JSON.stringify(reservas));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    reservas,
    crearReserva,
    validarMail,
    validarFechas,
    agregarReserva
  };
}
