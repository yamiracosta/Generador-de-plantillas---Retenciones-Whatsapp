document.addEventListener('DOMContentLoaded', () => {
    // Obtener los campos
    const txtNumeroCliente = document.getElementById('numeroCliente');
    const txtUsuarioE = document.getElementById('usuarioE');
    const txtSnLlamada = document.getElementById('snLlamada');
    const dtChsrMesAplicar = document.getElementById('mesAplicar');

    // === 1️⃣ Validación para #numeroCliente ===
    // Solo números, debe empezar con 9 y máximo 9 caracteres
    txtNumeroCliente.addEventListener('input', () => {
        let value = txtNumeroCliente.value.replace(/\D/g, ''); // elimina todo lo que no sea número
        if (value.length > 9) value = value.slice(0, 9);    // máximo 9 caracteres
        if (value && !value.startsWith('9')) value = '';    // si no empieza con 9, limpiar
        txtNumeroCliente.value = value;
    });

    // Bloquear letras o símbolos, pero permitir pegar (Ctrl+V / Cmd+V)
    txtNumeroCliente.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
        const isCtrlV = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v'; // Ctrl+V o Cmd+V
        const isCtrlC = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c'; // Ctrl+C
        const isCtrlX = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x'; // Ctrl+X

        if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key) && !isCtrlV && !isCtrlC && !isCtrlX) {
            e.preventDefault();
        }
    });

    //Validación para el dateChooser mesesAplicar
    if (dtChsrMesAplicar) {
        const today = new Date();
        const currentYear = today.getFullYear(); // 2025
        const currentMonth = today.getMonth() + 1; // getMonth() es 0-indexado, +1 (Octubre = 10)
        const nextYear = currentYear + 1; //2026

        // Formatear el mes a 2 dígitos (ej: "09" o "10")
        const formattedMonth = currentMonth.toString().padStart(2, '0');

        // 1. Configurar min/max para el calendario emergente
        const minDate = `${currentYear}-${formattedMonth}`; // "2025-10"
        const maxDate = `${nextYear}-12`;               // "2026-12"

        dtChsrMesAplicar.min = minDate;
        dtChsrMesAplicar.max = maxDate;
    }

    // === 2️⃣ Validación para #usuarioE ===
    // Primer carácter debe ser "E" y los demás números (máximo 8 caracteres)
    txtUsuarioE.addEventListener('input', () => {
        let value = txtUsuarioE.value.toUpperCase(); // convierte automáticamente a mayúscula
        // Forzar que el primer carácter sea "E"
        if (!value.startsWith('E')) value = 'E' + value.replace(/[^0-9]/g, '');
        else {
            // Solo permitir números después de la E
            const onlyNumbers = value.slice(1).replace(/\D/g, '');
            value = 'E' + onlyNumbers;
        }
        if (value.length > 8) value = value.slice(0, 8); // máximo 8 caracteres
        txtUsuarioE.value = value;
    });

    // Bloquear caracteres no válidos (solo permitir E al inicio y números después)
    txtUsuarioE.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
        if (txtUsuarioE.selectionStart === 0 && e.key.toUpperCase() === 'E') return; // permitir la E al inicio
        if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });


    // === 3️⃣ Validación para #snLlamada ===
    // Solo números
    txtSnLlamada.addEventListener('input', () => {
        txtSnLlamada.value = txtSnLlamada.value.replace(/\D/g, '');
    });

    // Bloquear letras o símbolos, pero permitir copiar, pegar y cortar (Ctrl+C / Ctrl+V / Ctrl+X)
    txtSnLlamada.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];
        const isCtrlV = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v'; // pegar
        const isCtrlC = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c'; // copiar
        const isCtrlX = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x'; // cortar

        if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key) && !isCtrlV && !isCtrlC && !isCtrlX) {
            e.preventDefault();
        }
    });

})