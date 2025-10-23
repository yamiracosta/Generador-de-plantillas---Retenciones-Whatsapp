document.addEventListener('DOMContentLoaded', () => {
    // Obtener los campos
    const numeroCliente = document.getElementById('numeroCliente');
    const usuarioE = document.getElementById('usuarioE');
    const snLlamada = document.getElementById('snLlamada');

    // === 1️⃣ Validación para #numeroCliente ===
    // Solo números, debe empezar con 9 y máximo 9 caracteres
    numeroCliente.addEventListener('input', () => {
        let value = numeroCliente.value.replace(/\D/g, ''); // elimina todo lo que no sea número
        if (value.length > 9) value = value.slice(0, 9);    // máximo 9 caracteres
        if (value && !value.startsWith('9')) value = '';    // si no empieza con 9, limpiar
        numeroCliente.value = value;
    });

    // Bloquear letras o símbolos
    numeroCliente.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });


    // === 2️⃣ Validación para #usuarioE ===
    // Primer carácter debe ser "E" y los demás números (máximo 8 caracteres)
    usuarioE.addEventListener('input', () => {
        let value = usuarioE.value.toUpperCase(); // convierte automáticamente a mayúscula
        // Forzar que el primer carácter sea "E"
        if (!value.startsWith('E')) value = 'E' + value.replace(/[^0-9]/g, '');
        else {
            // Solo permitir números después de la E
            const onlyNumbers = value.slice(1).replace(/\D/g, '');
            value = 'E' + onlyNumbers;
        }
        if (value.length > 8) value = value.slice(0, 8); // máximo 8 caracteres
        usuarioE.value = value;
    });

    // Bloquear caracteres no válidos (solo permitir E al inicio y números después)
    usuarioE.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (usuarioE.selectionStart === 0 && e.key.toUpperCase() === 'E') return; // permitir la E al inicio
        if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });


    // Bloquear caracteres no válidos (solo permitir E al inicio y números después)
    usuarioE.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (usuarioE.selectionStart === 0 && e.key.toUpperCase() === 'E') return; // permitir la E al inicio
        if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });


    // === 3️⃣ Validación para #snLlamada ===
    // Solo números
    snLlamada.addEventListener('input', () => {
        snLlamada.value = snLlamada.value.replace(/\D/g, '');
    });

    // Bloquear letras o símbolos
    snLlamada.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

})