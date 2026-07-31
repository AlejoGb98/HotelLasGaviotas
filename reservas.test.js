//let reservas = require('./src/core/reservas');

let { reservas, crearReserva, validarMail, validarFechas, agregarReserva} = require("./src/core/reservas"); 


beforeEach(function() {

});

test("Prueba crear una reserva, debe devolver un objeto reserva", function(){
    const reserva = {
        nombre: "Martin Gomez",
        telefono: "098765432",
        correo: "martingon@gmail.com",
        llegada: "2026-12-20",
        salida: "2027-01-21",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    crearReserva(reserva);
    expect(reservas.length).toBe(1);
});

test("Prueba crear otra reserva, debe devolver un objeto reserva", function(){
    const reserva = {
        nombre: "Martin Martine",
        telefono: "098765432",
        correo: "martinmar@gmail.com",
        llegada: "2026-11-20",
        salida: "2027-02-21",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    crearReserva(reserva);
    expect(reservas.length).toBe(2);
});

test("Prueba verificar email valido, debe ser valido", function(){
    const reserva = {
        nombre: "Martin Gomez",
        telefono: "098765432",
        correo: "martingon@gmail.com",
        llegada: "2026-12-20",
        salida: "2027-01-21",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    let mailValido = validarMail(reserva.correo);

    expect(mailValido).toBeTruthy();
});

test("Prueba verificar email valido, debe ser invalido", function(){
    const reserva = {
        nombre: "Martin Gomez",
        telefono: "098765432",
        correo: "martingongmail.com",
        llegada: "2026-12-20",
        salida: "2027-01-21",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    let mailValido = validarMail(reserva.correo);

    expect(mailValido).toBeFalsy();
});

test("Prueba verificar fechas validas, debe ser valido", function(){
    const reserva = {
        nombre: "Martin Gomez",
        telefono: "098765432",
        correo: "martingon@gmail.com",
        llegada: "2026-12-20",
        salida: "2027-01-21",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    let fechasOk = validarFechas(reserva.llegada, reserva.salida);

    expect(fechasOk).toBeTruthy();
});

test("Prueba verificar fechas validas, debe ser invalido", function(){
    const reserva = {
        nombre: "Martin Gomez",
        telefono: "098765432",
        correo: "martingon@gmail.com",
        llegada: "2026-09-20",
        salida: "2026-09-10",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    let fechasOk = validarFechas(reserva.llegada, reserva.salida);

    expect(fechasOk).toBeFalsy();
});

test("Prueba verificar fechas validas, debe ser invalido", function(){
    const reserva = {
        nombre: "Martin Gomez",
        telefono: "098765432",
        correo: "martingon@gmail.com",
        llegada: null,
        salida: "2026-11-21",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    let fechasOk = validarFechas(reserva.llegada, reserva.salida);

    expect(fechasOk).toBeFalsy();
});

test("Prueba verificar fechas validas, debe ser invalido", function(){
    const reserva = {
        nombre: "Martin Gomez",
        telefono: "098765432",
        correo: "martingon@gmail.com",
        llegada: "2025-01-21",
        salida: "2025-03-10",
        habitacion: "3",
        personas: "1",
        observaciones: ""
    }

    let fechasOk = validarFechas(reserva.llegada, reserva.salida);

    expect(fechasOk).toBeFalsy();
});

test("Prueba verificar incremento de id, debe ser valido", function(){
    expect(reservas[1].id).toBeGreaterThan(reservas[0].id);
});
