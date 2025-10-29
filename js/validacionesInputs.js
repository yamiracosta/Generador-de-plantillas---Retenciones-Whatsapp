document.addEventListener('DOMContentLoaded', () => {
    // Obtener los campos
    const txtNumeroCliente = document.getElementById('numeroCliente');
    const txtUsuarioE = document.getElementById('usuarioE');
    //------------------------------------------------------------------
    //Para NC solamente:
    const txtNumeroCliente2 = document.getElementById('numeroCliente2');
    const txtUsuarioE2 = document.getElementById('usuarioE2');
    //------------------------------------------------------------------
    const txtSnLlamada = document.getElementById('snLlamada');
    const dtChsrMesAplicar = document.getElementById('mesAplicar');
    const txtMontoSinIGV = document.getElementById('montoConIGV');
    //-------------------------------------------------------------------
    // Para descuento.html
    const txtNumLineaPrinc = document.getElementById('numeroLineaPrincipal');

    // === 1️⃣ Validación para #numeroCliente ===
    // Solo números, debe empezar con 9 y máximo 9 caracteres
    if (txtNumeroCliente) {
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
    }

    // === 1️⃣ Validación para #numeroLineaPrincipal ===
    // Solo números, debe empezar con 9 y máximo 9 caracteres
    if (txtNumLineaPrinc) {
        txtNumLineaPrinc.addEventListener('input', () => {
            let value = txtNumLineaPrinc.value.replace(/\D/g, ''); // elimina todo lo que no sea número
            if (value.length > 9) value = value.slice(0, 9);    // máximo 9 caracteres
            if (value && !value.startsWith('9')) value = '';    // si no empieza con 9, limpiar
            txtNumLineaPrinc.value = value;
        });

        // Bloquear letras o símbolos, pero permitir pegar (Ctrl+V / Cmd+V)
        txtNumLineaPrinc.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
            const isCtrlV = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v'; // Ctrl+V o Cmd+V
            const isCtrlC = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c'; // Ctrl+C
            const isCtrlX = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x'; // Ctrl+X

            if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key) && !isCtrlV && !isCtrlC && !isCtrlX) {
                e.preventDefault();
            }
        });
    }

    //-----------------------------------------------------------------------------------------------------

    // Para NC:
    if (txtNumeroCliente2) {
        txtNumeroCliente2.addEventListener('input', () => {
            let value = txtNumeroCliente2.value.replace(/\D/g, ''); // elimina todo lo que no sea número
            if (value.length > 9) value = value.slice(0, 9);    // máximo 9 caracteres
            if (value && !value.startsWith('9')) value = '';    // si no empieza con 9, limpiar
            txtNumeroCliente2.value = value;
        });

        txtNumeroCliente2.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
            const isCtrlV = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v'; // Ctrl+V o Cmd+V
            const isCtrlC = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c'; // Ctrl+C
            const isCtrlX = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x'; // Ctrl+X

            if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key) && !isCtrlV && !isCtrlC && !isCtrlX) {
                e.preventDefault();
            }
        });
    }



    //-------------------------------------------------------------------------------------------------------

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
    if (txtUsuarioE) {
        txtUsuarioE.addEventListener('input', () => {
            let value = txtUsuarioE.value.toUpperCase(); // 1. Siempre mayúsculas

            // 2. Si el campo está vacío, permitirlo y no hacer nada.
            // Esto es lo que te permite borrar la 'E' y dejar el campo vacío.
            if (value === '') {
                return;
            }

            // 3. Si no empieza con 'E', borrar el contenido.
            // (Esto evita que el usuario escriba "123" o pegue "HOLA")
            if (!value.startsWith('E')) {
                txtUsuarioE.value = '';
                return;
            }

            // 4. Si llegamos aquí, SÍ empieza con 'E'.
            // Limpiamos todo lo que sigue para que sean solo números.
            const numbers = value.slice(1).replace(/\D/g, ''); // \D = no-dígito
            let formattedValue = 'E' + numbers;

            // 5. Aplicar el límite de 8 caracteres
            if (formattedValue.length > 8) {
                formattedValue = formattedValue.slice(0, 8);
            }

            txtUsuarioE.value = formattedValue;
        });
    }

    //------------------------------------------------------------------------------------------------------------

    //Para NC:
    if (txtUsuarioE2) {
        txtUsuarioE2.addEventListener('input', () => {
            let value = txtUsuarioE2.value.toUpperCase(); // 1. Siempre mayúsculas

            // 2. Si el campo está vacío, permitirlo y no hacer nada.
            // Esto es lo que te permite borrar la 'E' y dejar el campo vacío.
            if (value === '') {
                return;
            }

            // 3. Si no empieza con 'E', borrar el contenido.
            // (Esto evita que el usuario escriba "123" o pegue "HOLA")
            if (!value.startsWith('E')) {
                txtUsuarioE2.value = '';
                return;
            }

            // 4. Si llegamos aquí, SÍ empieza con 'E'.
            // Limpiamos todo lo que sigue para que sean solo números.
            const numbers = value.slice(1).replace(/\D/g, ''); // \D = no-dígito
            let formattedValue = 'E' + numbers;

            // 5. Aplicar el límite de 8 caracteres
            if (formattedValue.length > 8) {
                formattedValue = formattedValue.slice(0, 8);
            }

            txtUsuarioE2.value = formattedValue;
        });
    }

    //------------------------------------------------------------------------------------------------------------


    // === 3️⃣ Validación para #snLlamada ===
    // --- 1. KEYDOWN (Previene la escritura inválida) ---
    txtSnLlamada.addEventListener('keydown', (e) => {
        // Permite comandos (Ctrl+V, Ctrl+C, Ctrl+X, Cmd+A, etc.)
        const isCtrlCommand = e.ctrlKey || e.metaKey;
        // Permite teclas de navegación y edición (Flechas, Backspace, Tab, Shift, etc.)
        const isNavKey = e.key && e.key.length > 1; // "Backspace", "Shift", "ArrowLeft"

        if (isCtrlCommand || isNavKey) {
            return; // No previene la acción
        }

        // --- Tus nuevas reglas de tecleo ---

        // Regla 1: No permitir guion si el campo está vacío
        if (e.key === '-' && e.target.value.length === 0) {
            e.preventDefault();
            return;
        }

        // Regla 2: No permitir guion si el último caracter ya es un guion
        if (e.key === '-' && e.target.value.endsWith('-')) {
            e.preventDefault();
            return;
        }

        // --- Regla final: Permitir solo alfanuméricos y guion ---
        const isAllowedChar = /[0-9a-zA-Z\-]/.test(e.key);

        if (!isAllowedChar) {
            e.preventDefault();
        }
    });


    // --- 2. INPUT (Limpia al pegar o modificar) ---
    txtSnLlamada.addEventListener('input', (e) => {
        let value = e.target.value;

        // 1. Elimina caracteres no permitidos (todo MENOS alfanum y guion)
        let cleanValue = value.replace(/[^0-9a-zA-Z\-]/g, '');

        // 2. Elimina guion al inicio (por si se pegó)
        cleanValue = cleanValue.replace(/^-+/, '');

        // 3. Reemplaza guiones múltiples con uno solo (por si se pegó "abc--def")
        cleanValue = cleanValue.replace(/--+/g, '-');

        // Se aplica el valor limpio
        if (value !== cleanValue) {
            e.target.value = cleanValue;
        }
    });


    // --- 3. CHANGE (Limpia al salir del campo) ---
    txtSnLlamada.addEventListener('change', (e) => {
        // Esta es la única forma segura de eliminar el guion final
        // sin arruinar la experiencia de escritura.
        let value = e.target.value;

        // 4. Elimina guion al final (ahora que el usuario terminó)
        let cleanValue = value.replace(/-+$/, ''); // Busca uno o más guiones al final

        if (value !== cleanValue) {
            e.target.value = cleanValue;
        }
    });

    //Validación para el campo "Monto con IGV":
    if (txtMontoSinIGV) {
        txtMontoSinIGV.addEventListener('input', (event) => {
            let value = event.target.value;

            // 1. (REGLA 2 y 3) Elimina "0" o "." como primer caracter
            if (value.startsWith('0') || value.startsWith('.')) {
                value = value.substring(1); // Borra el primer caracter
            }

            // 2. Limpia caracteres no válidos (solo permite dígitos y un punto)
            value = value.replace(/[^\d\.]/g, '');

            // 3. Elimina puntos "extra" (para que solo haya uno)
            value = value.replace(/(\..*)\./g, '$1');

            // 4. (REGLA 1) Limita a un máximo de 2 decimales
            //    Busca (un punto + 2 dígitos) y borra cualquier dígito que venga después.
            value = value.replace(/(\.\d{2})\d+/g, '$1');

            // Asigna el valor limpio de vuelta al input
            event.target.value = value;
        });
    }
})