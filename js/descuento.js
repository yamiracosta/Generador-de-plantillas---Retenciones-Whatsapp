document.addEventListener('DOMContentLoaded', () => {
    let ckbIMR = document.getElementById('imrCheck');
    let txtIMR = document.getElementById('imrText');
    let txtSuper = document.getElementById('vbSupervisor');
    let ckbDsctoVig = document.getElementById('clienteDescuento');
    let cboRequiereAnul = document.getElementById('requiere');
    let txtAreaCods = document.getElementById('textAreaCodigos');
    let ckbNuevoPlan = document.getElementById('nuevoPlanCheck');
    let cboNuevoPlan = document.getElementById('nuevoPlanCbo');
    let lblComprPago = document.getElementById('lblCompromPago');
    let mesAplicar = document.getElementById('mesAplicar');
    let inputCpPago = document.getElementById('comportamientoPago');
    let ckbFecComprPago = document.getElementById('compromisoPago');
    const form = document.getElementById('formCliente');
    const txtAreaResultado = document.getElementById('resultado');
    const btnCopiar = document.getElementById('btnCopiar');
    const btnNuevaPlant = document.getElementById('btnNuevaPlantilla');
    const cboOperador = document.getElementById('operador');
    const cboPromocion = document.getElementById('promocion');
    const cboCantMeses = document.getElementById('meses');
    const txtSnLlamada = document.getElementById('snLlamada');
    const txtNumeroCli = document.getElementById('numeroCliente');
    const ckbSegmento = document.getElementById('segmentoCheck');
    const ckbCiclo = document.getElementById('cicloCheck');
    const cboSegmento = document.getElementById('segmentoCbo');
    const cboCiclo = document.getElementById('cicloCbo');

    //--------------------------------------------------------------------------------------
    //Habilitar o deshabilitar el campo de texto de IMR

    ckbIMR.addEventListener('change', () => {
        if (ckbIMR.checked) {
            txtIMR.disabled = false;
            txtIMR.value = ""; // Limpia el campo
            txtIMR.focus();    // (opcional) Coloca el cursor en el campo
        } else {
            txtIMR.disabled = true;
            txtIMR.value = "No afecto a IMR"; // Mensaje cuando se desactiva
        }
    });

    //-------------------------------------------------------------------------------------------
    //Habilitar o deshabilitar la opción de cliente con descuento vigente

    ckbDsctoVig.addEventListener('change', () => {
        if (ckbDsctoVig.checked) {
            cboRequiereAnul.disabled = false;
            if (cboRequiereAnul.value == "1") {
                txtAreaCods.disabled = false;
            } else {
                txtAreaCods.disabled = true;
            }
        } else {
            cboRequiereAnul.disabled = true;
            txtAreaCods.disabled = true;
        }
    });

    cboRequiereAnul.addEventListener('change', () => {
        if (cboRequiereAnul.value == "1") {
            txtAreaCods.disabled = false;
            txtAreaCods.focus();
        } else {
            txtAreaCods.disabled = true;
            txtAreaCods.value = "";
        }
    });

    //-------------------------------------------------------------------------------------------
    //Habilitar o deshabilitar el texto de nuevo plan
    ckbNuevoPlan.addEventListener('change', () => {
        if (ckbNuevoPlan.checked) {
            cboNuevoPlan.disabled = false;
        } else {
            cboNuevoPlan.disabled = true;
        }
    });

    //----------------------------------------------------------------------------------------------
    // Inicia deshabilitado si no está marcado
    if (!ckbIMR.checked) {
        txtIMR.disabled = true;
        txtIMR.value = "No afecto a IMR";
    }

    txtSuper.value = "GIANFRANCO PAZ";
    cboRequiereAnul.disabled = true;
    txtAreaCods.disabled = true;
    lblComprPago.textContent = "Compromiso de pago: " + mostrarFechComprPago();

    //----------------------------------------------------------------------------------------------
    //Permitir solo valores válidos para el campo de IMR
    txtIMR.addEventListener('input', () => {
        let value = txtIMR.value;

        // Permitir solo dígitos y un punto decimal
        value = value.replace(/[^0-9.]/g, '');

        // Evitar más de un punto
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts[1]; // elimina puntos adicionales
        }

        // Si el valor empieza con 0 y no tiene punto decimal, lo elimina (para evitar "00" o "01")
        if (/^0[0-9]+$/.test(value)) {
            value = value.replace(/^0+/, '');
        }

        // Evitar que solo haya un punto
        if (value === '.') {
            value = '';
        }

        // Si el número es 0 o menor, limpiar
        if (value && parseFloat(value) <= 0) {
            value = '';
        }

        txtIMR.value = value;
    });

    //---------------------------------------------------------------------------------------
    // Bloquear la escritura del campo "COMPORTAMIENTO DE PAGO"
    inputCpPago.addEventListener('keydown', (e) => {
        // Permitir: teclas de control, flechas y números
        const allowedKeys = [
            'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
            'Backspace', 'Tab', 'Delete', // incluye el punto decimal
        ];

        // Permitir números del teclado principal y del numpad
        if (
            allowedKeys.includes(e.key) ||
            (e.key >= '0' && e.key <= '9')
        ) {
            return; // permitir
        }

        e.preventDefault(); // bloquea cualquier otra tecla
    });

    // Detectar cuando cambia el valor (por input o seteo manual)
    inputCpPago.addEventListener('input', () => {
        const valor = parseFloat(inputCpPago.value);

        // Si el valor no está entre 1 y 10, limpiar el campo
        if (valor < 1 || valor > 10) {
            inputCpPago.value = '';
        }
    });

    //------------------------------------------------------------------------------------------
    //Hacer que el botón genere la plantilla
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        //Limpiar el contenedor
        txtAreaResultado.textContent = "";

        //Establecer una variable temporal que luego adicionaremos otros valores de corresponder
        let txtAreaResultadoParcial = "";

        //Obtener valores
        let operador = document.getElementById('operador').value;
        let imr = document.getElementById('imrText').value;
        if (imr === "No afecto a IMR") {
            imr = `""${imr}""`;
        }
        let promocion = document.getElementById('promocion').value;
        let cantidadMeses = document.getElementById('meses').value;
        let mesesAplicar = formatearMes(mesAplicar.value);
        let cpPago = document.getElementById('comportamientoPago').value;
        let sn = document.getElementById('snLlamada').value;
        let vbSupervisor = document.getElementById('vbSupervisor').value;

        let fecComprPago = mostrarFechComprPago();
        let clientDsctVig = document.getElementById('lblClienteDescVig').textContent + " " + cboRequiereAnul.options[cboRequiereAnul.selectedIndex].text;
        let codsOCC = txtAreaCods.value;
        let plan = cboNuevoPlan.options[cboNuevoPlan.selectedIndex].text;

        let numeroCliente = document.getElementById('numeroCliente').value;
        let usuarioE = document.getElementById('usuarioE').value;
        let subcampaña = document.getElementById('subcampaña').value;
        let segmento = cboSegmento.options[cboSegmento.selectedIndex].text;
        let ciclo = cboCiclo.options[cboCiclo.selectedIndex].text;

        //Escribir plantilla
        txtAreaResultadoParcial = `"TIPO DE SOLICITUD: Contención/Competencia\nIMR del cliente: ${imr}\nOperador: ${operador}\nPromoción ofrecida: ${promocion}\nCantidad de meses: ${cantidadMeses}\nMeses a aplicar: ${mesesAplicar}\nComportamiento de pago: ${cpPago}\nSN de la llamada: ${sn}\nVB del supervisor: ${vbSupervisor}`;

        if (ckbFecComprPago.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nCompromiso de pago: ${fecComprPago}`;
        }

        if (ckbDsctoVig.checked) {
            if (codsOCC.trim() === "") {
                txtAreaResultadoParcial = `${txtAreaResultadoParcial}\n${clientDsctVig}`;
            } else {
                txtAreaResultadoParcial = `${txtAreaResultadoParcial}\n${clientDsctVig}(${codsOCC})`;
            }
        }

        if (ckbNuevoPlan.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nNuevo plan: ${plan}`;
        }

        txtAreaResultadoParcial = `${txtAreaResultadoParcial}"`;

        //Culminar escribiendo la información para que el BO la revise:
        txtAreaResultadoParcial = `${txtAreaResultadoParcial}\n\nCampaña: ${subcampaña}\nN° de teléfono: ${numeroCliente}\nUsuario: ${usuarioE}`;

        if (ckbSegmento.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nSegmento: ${segmento}`;
        }

        if (ckbCiclo.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nCiclo de facturación: ${ciclo}`;
        }

        //Guardar todo el texto en la variables global y mostrarla en el campo de texto:
        txtAreaResultado.textContent = txtAreaResultadoParcial;
    });

    //Botón para copiar la plantilla generada
    btnCopiar.addEventListener('click', () => {
        const textarea = document.getElementById('resultado');
        textarea.select();
        textarea.setSelectionRange(0, 99999); // Para móviles
        navigator.clipboard.writeText(textarea.value)
    });

    //Botón para nueva plantilla
    btnNuevaPlant.addEventListener('click', () => {
        cboOperador.selectedIndex = 0;
        cboPromocion.selectedIndex = 0;
        cboCantMeses.selectedIndex = 0;
        mesAplicar.value = "";
        inputCpPago.value = "";
        txtSnLlamada.value = "";
        ckbIMR.checked = false;
        txtIMR.disabled = true;
        txtIMR.value = "No afecto a IMR";
        txtSuper.value = "GIANFRANCO PAZ";
        ckbNuevoPlan.checked = false;
        cboNuevoPlan.selectedIndex = 6;
        cboNuevoPlan.disabled = true;
        ckbFecComprPago.checked = false;
        ckbDsctoVig.checked = false;
        cboRequiereAnul.selectedIndex = 0;
        cboRequiereAnul.disabled = true;
        txtAreaCods.disabled = true;
        txtAreaCods.value = "";
        txtAreaResultado.textContent = "";
        txtNumeroCli.value = "";
        ckbSegmento.checked=false;
        ckbCiclo.checked=false;
        cboSegmento.disabled=true;
        cboSegmento.selectedIndex=0;
        cboCiclo.disabled=true;
        cboCiclo.selectedIndex=0;
    });

    //Activar los combos de ciclo y segmento
    ckbSegmento.addEventListener('change', () => {
        if (ckbSegmento.checked) {
            cboSegmento.disabled = false;
        } else {
            cboSegmento.disabled = true;
        }
    })

    ckbCiclo.addEventListener('change', () => {
        if (ckbCiclo.checked) {
            cboCiclo.disabled = false;
        } else {
            cboCiclo.disabled = true;
        }
    })
});

function mostrarFechComprPago() {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 2); // Sumar 2 días

    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return fechaFormateada;
}

function formatearMes(fechaStr) {
    // fechaStr tiene formato "YYYY-MM"
    const [anio, mes] = fechaStr.split('-');
    const meses = [
        'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
        'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];

    const nombreMes = meses[parseInt(mes) - 1];
    const anioActual = new Date().getFullYear();

    // Si el año coincide con el actual, solo muestra el mes
    if (parseInt(anio) === anioActual) {
        return nombreMes;
    } else {
        return `${nombreMes} ${anio}`;
    }
}