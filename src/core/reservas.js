var formulario = document.querySelector(".booking-form");

var reservas = [];

var reservasGuardadas = localStorage.getItem("reservas");

if (reservasGuardadas != null) {
  reservas = JSON.parse(reservasGuardadas);
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (formulario.checkValidity() == false) {
    formulario.reportValidity();
    return;
  }

  var nombre = formulario.elements["nombre"].value;
  var telefono = formulario.elements["telefono"].value;
  var correo = formulario.elements["correo"].value;
  var llegada = formulario.elements["llegada"].value;
  var salida = formulario.elements["salida"].value;
  var habitacion = formulario.elements["habitacion"].value;
  var personas = formulario.elements["personas"].value;
  var observaciones = formulario.elements["observaciones"].value;

  if (salida <= llegada) {
    alert("La fecha de salida debe ser posterior a la fecha de llegada.");
    return;
  }

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

  reservas.push(reserva);

  console.log(reserva);

  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(
    "Reserva registrada correctamente. Número de reserva: " + reserva.id
  );

  formulario.reset();
});

