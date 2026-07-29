// Recuperamos las reservas guardadas
var reservasGuardadas = localStorage.getItem("reservas");
var reservas = [];

// Filtro seleccionado
var filtroActual = "Todas";

if (reservasGuardadas != null) {
  reservas = JSON.parse(reservasGuardadas);
}

// Elementos del HTML
var tablaReservas = document.getElementById("tabla-reservas");
var sinReservas = document.getElementById("sin-reservas");
var cantidadResultados = document.getElementById("cantidad-resultados");
var textoResultados = document.getElementById("texto-resultados");

// Botones para filtrar
var botonesFiltros = document.querySelectorAll(".filter-button");

// Agregamos el evento a cada filtro
for (var i = 0; i < botonesFiltros.length; i++) {
  botonesFiltros[i].addEventListener("click", seleccionarFiltro);
}

// Se ejecuta al presionar un filtro
function seleccionarFiltro(evento) {
  filtroActual = evento.currentTarget.getAttribute("data-estado");

  for (var i = 0; i < botonesFiltros.length; i++) {
    botonesFiltros[i].classList.remove("active");
  }

  evento.currentTarget.classList.add("active");

  mostrarReservas();
}

// Muestra el listado de reservas
function mostrarReservas() {
  tablaReservas.innerHTML = "";

  actualizarCantidades();

  var cantidadMostrada = 0;

  for (var i = 0; i < reservas.length; i++) {
    var reserva = reservas[i];

    if (reserva.estado == null || reserva.estado == "") {
      reserva.estado = "Pendiente";
    }

    if (
      filtroActual == "Todas" ||
      reserva.estado == filtroActual
    ) {
      crearFila(reserva, i);
      cantidadMostrada++;
    }
  }

  cantidadResultados.textContent =
    cantidadMostrada + " resultados";

  textoResultados.textContent =
    "Mostrando " + cantidadMostrada + " reservas";

  if (cantidadMostrada == 0) {
    sinReservas.style.display = "block";
  } else {
    sinReservas.style.display = "none";
  }
}

// Crea una fila en la tabla
function crearFila(reserva, posicion) {
  var fila = document.createElement("tr");

  var noches = calcularNoches(
    reserva.llegada,
    reserva.salida
  );

  var precioNoche = obtenerPrecio(reserva.habitacion);
  var total = noches * precioNoche;

  fila.innerHTML =
    "<td>" +
      '<span class="reservation-id">' +
        crearNumeroReserva(reserva.id) +
      "</span>" +
    "</td>" +

    "<td>" +
      '<span class="status status--' +
        reserva.estado.toLowerCase() +
      '">' +
        reserva.estado +
      "</span>" +
    "</td>" +

    "<td>" +
      '<span class="guest-name">' +
        reserva.nombre +
      "</span>" +
      '<span class="guest-email">' +
        reserva.correo +
      "</span>" +
    "</td>" +

    "<td>" +
      reserva.habitacion +
    "</td>" +

    "<td>" +
      formatearFecha(reserva.llegada) +
    "</td>" +

    "<td>" +
      formatearFecha(reserva.salida) +
    "</td>" +

    "<td>" +
      noches +
    "</td>" +

    '<td class="reservation-total">' +
      "USD " + total +
    "</td>";

  var celdaAcciones = document.createElement("td");
  var acciones = document.createElement("div");

  acciones.className = "actions";

  // Confirmar o rechazar solamente si está pendiente
  if (reserva.estado == "Pendiente") {
    var botonConfirmar = crearBoton(
      "✓",
      "Confirmar reserva",
      "action-button action-button--confirm"
    );

    botonConfirmar.addEventListener("click", function () {
      cambiarEstado(posicion, "Confirmada");
    });

    acciones.appendChild(botonConfirmar);

    var botonRechazar = crearBoton(
      "×",
      "Rechazar reserva",
      "action-button action-button--reject"
    );

    botonRechazar.addEventListener("click", function () {
      cambiarEstado(posicion, "Rechazada");
    });

    acciones.appendChild(botonRechazar);
  }

  // Cancelar reservas pendientes o confirmadas
  if (
    reserva.estado == "Pendiente" ||
    reserva.estado == "Confirmada"
  ) {
    var botonCancelar = crearBoton(
      "⊘",
      "Cancelar reserva",
      "action-button action-button--cancel"
    );

    botonCancelar.addEventListener("click", function () {
      cancelarReserva(posicion);
    });

    acciones.appendChild(botonCancelar);
  }

  // Si no hay acciones disponibles
  if (acciones.children.length == 0) {
    acciones.textContent = "—";
  }

  celdaAcciones.appendChild(acciones);
  fila.appendChild(celdaAcciones);

  tablaReservas.appendChild(fila);
}

// Crea los botones de acciones
function crearBoton(texto, titulo, clase) {
  var boton = document.createElement("button");

  boton.type = "button";
  boton.textContent = texto;
  boton.title = titulo;
  boton.className = clase;

  return boton;
}

// Cambia el estado
function cambiarEstado(posicion, nuevoEstado) {
  var confirmar = confirm(
    '¿Deseás cambiar esta reserva a "' +
    nuevoEstado +
    '"?'
  );

  if (confirmar == false) {
    return;
  }

  reservas[posicion].estado = nuevoEstado;

  guardarReservas();
  mostrarReservas();

  alert("El estado fue actualizado correctamente.");
}

// Cancela una reserva
function cancelarReserva(posicion) {
  var estado = reservas[posicion].estado;

  if (
    estado == "Cancelada" ||
    estado == "Rechazada"
  ) {
    alert("Esta reserva no puede cancelarse.");
    return;
  }

  var confirmar = confirm(
    "¿Seguro que deseás cancelar esta reserva?"
  );

  if (confirmar == false) {
    return;
  }

  reservas[posicion].estado = "Cancelada";

  guardarReservas();
  mostrarReservas();

  alert("La reserva fue cancelada correctamente.");
}

// Guarda los cambios
function guardarReservas() {
  localStorage.setItem(
    "reservas",
    JSON.stringify(reservas)
  );
}

// Calcula la cantidad de noches
function calcularNoches(llegada, salida) {
  var fechaLlegada = new Date(llegada + "T00:00:00");
  var fechaSalida = new Date(salida + "T00:00:00");

  var diferencia = fechaSalida - fechaLlegada;
  var noches = diferencia / 86400000;

  if (noches < 1 || isNaN(noches)) {
    noches = 1;
  }

  return noches;
}

// Devuelve el precio por noche
function obtenerPrecio(habitacion) {
  if (habitacion == "Habitación estándar") {
    return 120;
  }

  if (habitacion == "Doble superior") {
    return 180;
  }

  if (habitacion == "Suite junior") {
    return 250;
  }

  return 0;
}

// Convierte la fecha a un formato más legible
function formatearFecha(fecha) {
  if (fecha == null || fecha == "") {
    return "Sin fecha";
  }

  var partes = fecha.split("-");

  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Crea un número de reserva parecido a LG-2026-001
function crearNumeroReserva(id) {
  var numero = String(id);

  while (numero.length < 3) {
    numero = "0" + numero;
  }

  return "LG-2026-" + numero;
}

// Actualiza las cantidades de los filtros
function actualizarCantidades() {
  var confirmadas = 0;
  var pendientes = 0;
  var rechazadas = 0;
  var canceladas = 0;

  for (var i = 0; i < reservas.length; i++) {
    var estado = reservas[i].estado;

    if (estado == "Confirmada") {
      confirmadas++;
    } else if (estado == "Pendiente") {
      pendientes++;
    } else if (estado == "Rechazada") {
      rechazadas++;
    } else if (estado == "Cancelada") {
      canceladas++;
    }
  }

  document.getElementById("cantidad-todas").textContent =
    reservas.length;

  document.getElementById("cantidad-confirmadas").textContent =
    confirmadas;

  document.getElementById("cantidad-pendientes").textContent =
    pendientes;

  document.getElementById("cantidad-rechazadas").textContent =
    rechazadas;

  document.getElementById("cantidad-canceladas").textContent =
    canceladas;
}

// Muestra las reservas al cargar la página
mostrarReservas();
