var reservas = [];

var formulario = document.querySelector(".booking-form");

var reservasGuardadas = localStorage.getItem("reservas");

if (reservasGuardadas != null) {
  reservas = JSON.parse(reservasGuardadas);
}

if(formulario){
  formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  
    if (formulario.checkValidity() == false) {
      formulario.reportValidity();
      return;
    }
  
    crearReserva(formulario);
  
    formulario.reset();
  });
}

function crearReserva(formulario){
    /* var nombre = formulario.elements["nombre"].value;
    var telefono = formulario.elements["telefono"].value;
    var correo = formulario.elements["correo"].value;
    var llegada = formulario.elements["llegada"].value;
    var salida = formulario.elements["salida"].value;
    var habitacion = formulario.elements["habitacion"].value;
    var personas = formulario.elements["personas"].value;
    var observaciones = formulario.elements["observaciones"].value; */
    console.log(formulario);

    var nombre = formulario.nombre;
    var telefono = formulario.telefono;
    var correo = formulario.correo;
    var llegada = formulario.llegada;
    var salida = formulario.salida;
    var habitacion = formulario.habitacion;
    var personas = formulario.personas;
    var observaciones = formulario.observaciones;

    var reserva = {
      id: reservas.length + 1,
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      llegada: llegada,
      salida: salida,
      habitacion: habitacion,
      personas: personas,
      observaciones: observaciones,
      estado: "Pendiente"
    };
    
    if(validarMail(reserva.correo) && validarFechas(reserva.llegada, reserva.salida)){
      agregarReserva(reserva);
    }

}

function validarMail(correo){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function validarFechas(fechaLlegada, fechaSalida){
  const fecha = new Date().toISOString().split('T')[0];

  if(fechaSalida <= fechaLlegada) return false;

   if(fechaSalida == null || fechaLlegada == null) return false;

   if(fechaLlegada <= fecha || fechaSalida <= fecha) return false;

   return true;
}

function agregarReserva(reserva){
    reservas.push(reserva)
    localStorage.setItem("reservas", JSON.stringify(reservas));

    /* alert(
      "Reserva registrada correctamente. Número de reserva: " + reserva.id
    ); */
}


 if (typeof module !== "undefined") {
  module.exports = {reservas, crearReserva, validarMail, validarFechas, agregarReserva};
 }
 