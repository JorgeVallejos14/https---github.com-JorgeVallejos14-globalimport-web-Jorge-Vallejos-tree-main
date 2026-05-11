document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        // Prevenir el envío del formulario si hay errores
        if (!validarNombre() || !validarFechaNacimiento() || !validarRut() || !validarGenero() || !validarNacionalidad()) {
            event.preventDefault();
        }
    });

    // Validar Nombre Completo
    function validarNombre() {
        const nombre = document.getElementById("nombre");
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/; // Solo letras y espacios, entre 3 y 60 caracteres

        if (!regex.test(nombre.value.trim())) {
            alert("El nombre completo debe contener solo letras y espacios, entre 3 y 60 caracteres.");
            nombre.classList.add("error");
            return false;
        }

        nombre.classList.remove("error");
        return true;
    }

    // Validar Fecha de Nacimiento
    function validarFechaNacimiento() {
        const fechaNacimiento = document.getElementById("fecha-nacimiento");
        const fechaIngresada = new Date(fechaNacimiento.value);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaIngresada.getFullYear();
        const mes = hoy.getMonth() - fechaIngresada.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaIngresada.getDate())) {
            edad--;
        }

        if (isNaN(fechaIngresada) || edad < 18) {
            alert("Debes ser mayor de 18 años para registrarte.");
            fechaNacimiento.classList.add("error");
            return false;
        }

        fechaNacimiento.classList.remove("error");
        return true;
    }

    // Validar RUT
    function validarRut() {
        const rut = document.getElementById("documento");
        const regex = /^[0-9]{7,8}$/; // Solo números, entre 7 y 8 dígitos

        if (!regex.test(rut.value.trim())) {
            alert("El RUT debe contener solo números, entre 7 y 8 dígitos.");
            rut.classList.add("error");
            return false;
        }

        if (!validarRutChileno(rut.value.trim())) {
            alert("El RUT ingresado no es válido.");
            rut.classList.add("error");
            return false;
        }

        rut.classList.remove("error");
        return true;
    }

    // Validar RUT Chileno
    function validarRutChileno(rut) {
        let suma = 0;
        let multiplicador = 2;

        for (let i = rut.length - 1; i >= 0; i--) {
            suma += rut[i] * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const digitoVerificador = 11 - (suma % 11);
        return digitoVerificador === 11 ? "0" : digitoVerificador === 10 ? "K" : digitoVerificador.toString();
    }

    // Validar Género
    function validarGenero() {
        const genero = document.getElementById("genero");

        if (genero.value === "") {
            alert("Debes seleccionar una opción en el campo Género.");
            genero.classList.add("error");
            return false;
        }

        genero.classList.remove("error");
        return true;
    }

    // Validar Nacionalidad
    function validarNacionalidad() {
        const nacionalidad = document.getElementById("nacionalidad");

        if (nacionalidad.value === "") {
            alert("Debes seleccionar una opción en el campo Nacionalidad.");
            nacionalidad.classList.add("error");
            return false;
        }

        nacionalidad.classList.remove("error");
        return true;
    }
});