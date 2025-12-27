document.addEventListener('DOMContentLoaded', () =>{
    const ckbIMR = document.getElementById('imrCheck');
    const txtIMR = document.getElementById('imrText');
    const ckbNuevoPlan = document.getElementById('nuevoPlanCheck');
    const cboNuevoPlan = document.getElementById('nuevoPlanCbo');
    const lblComprPago = document.getElementById('lblCompromPago');
    const dtChsrmesAplicar = document.getElementById('mesAplicar');
    const ckbFecComprPago = document.getElementById('compromisoPago');
    const form = document.getElementById('formCliente');
    const txtAreaResultado = document.getElementById('resultado');
    const btnCopiar = document.getElementById('btnCopiar');
    const btnNuevaPlant = document.getElementById('btnNuevaPlantilla');
    const cboPromocion = document.getElementById('promocion');
    const cboCantMeses = document.getElementById('meses');
    const txtSnLlamada = document.getElementById('snLlamada');
    const txtNumeroCli = document.getElementById('numeroCliente');
    const ckbSegmento = document.getElementById('segmentoCheck');
    const ckbCiclo = document.getElementById('cicloCheck');
    const cboSegmento = document.getElementById('segmentoCbo');
    const cboCiclo = document.getElementById('cicloCbo');
    const txtUsuarioE = document.getElementById('usuarioE');
    const cboSubcampaña = document.getElementById('subcampaña');
    const cboTipoSolicitud = document.getElementById('tipoSolicitud');

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

        // --- INICIO DE LA NUEVA LÓGICA ---
        // (Añadido para limitar a 2 decimales)
        // Volvemos a dividir por si acaso el paso anterior arregló un '1.2.3' a '1.2'
        const partsConDecimal = value.split('.');
        if (partsConDecimal.length === 2 && partsConDecimal[1].length > 2) {
            // Si hay una parte decimal (parts[1]) y tiene más de 2 dígitos,
            // la cortamos a 2 dígitos.
            value = partsConDecimal[0] + '.' + partsConDecimal[1].slice(0, 2);
        }
        // --- FIN DE LA NUEVA LÓGICA ---

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



    //------------------------------------------------------------------------------------------
    //Hacer que el botón genere la plantilla
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        //Limpiar el contenedor
        txtAreaResultado.textContent = "";

        //Establecer una variable temporal que luego adicionaremos otros valores de corresponder
        let txtAreaResultadoParcial = "";

        //Obtener valores
        let imr = txtIMR.value;
        if (imr === "No afecto a IMR") {
            imr = `""${imr}""`;
        }
        let promocion = cboPromocion.value;
        let cantidadMeses = cboCantMeses.value;
        let mesesAplicar = formatearMes(dtChsrmesAplicar.value);
        let sn = txtSnLlamada.value;
        let fecComprPago = mostrarFechComprPago();
        let plan = cboNuevoPlan.options[cboNuevoPlan.selectedIndex].text;

        let numeroCliente = txtNumeroCli.value;
        let usuarioE = txtUsuarioE.value;
        let subcampaña = cboSubcampaña.value;
        let segmento = cboSegmento.options[cboSegmento.selectedIndex].text;
        let ciclo = cboCiclo.options[cboCiclo.selectedIndex].text;

        let tipoSolicitud = cboTipoSolicitud.options[cboTipoSolicitud.selectedIndex].text;

        if (tipoSolicitud === "PROBLEMA DE COBERTURA") {
            tipoSolicitud = "Problemas con cobertura - Validación de celdas AT"
        }

        //Escribir plantilla
        txtAreaResultadoParcial = `"TIPO DE SOLICITUD: ${tipoSolicitud}\nIMR del cliente: ${imr}\nPromoción ofrecida: ${promocion}\nCantidad de meses: ${cantidadMeses}\nMeses a aplicar: ${mesesAplicar}\nSN de la llamada: ${sn}`;

        if (ckbFecComprPago.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nCompromiso de pago: ${fecComprPago}`;
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
        txtAreaResultado.select();
        txtAreaResultado.setSelectionRange(0, 99999); // Para móviles
        navigator.clipboard.writeText(txtAreaResultado.value)
    });

    //Botón para nueva plantilla
    btnNuevaPlant.addEventListener('click', () => {
        cboPromocion.selectedIndex = 0;
        cboCantMeses.selectedIndex = 0;
        dtChsrmesAplicar.value = "";
        txtSnLlamada.value = "";
        ckbIMR.checked = false;
        txtIMR.disabled = true;
        txtIMR.value = "No afecto a IMR";
        ckbNuevoPlan.checked = false;
        cboNuevoPlan.selectedIndex = 6;
        cboNuevoPlan.disabled = true;
        ckbFecComprPago.checked = false;
        txtAreaResultado.textContent = "";
        txtNumeroCli.value = "";
        ckbSegmento.checked = false;
        ckbCiclo.checked = false;
        cboSegmento.disabled = true;
        cboSegmento.selectedIndex = 0;
        cboCiclo.disabled = true;
        cboCiclo.selectedIndex = 0;
        txtNumeroCli.focus();
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