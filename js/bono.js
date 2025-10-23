document.addEventListener('DOMContentLoaded', () => {
    let txtSuper = document.getElementById('vbSupervisor');
    let ckbDsctoVig = document.getElementById('clienteDescuento');
    let cboRequiereAnul = document.getElementById('requiere');
    let txtAreaCods = document.getElementById('textAreaCodigos');
    let ckbNuevoPlan = document.getElementById('nuevoPlanCheck');
    let cboNuevoPlan = document.getElementById('nuevoPlanCbo');
    let lblComprPago = document.getElementById('lblCompromPago');
    let mesAplicar = document.getElementById('mesAplicar');
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

    //-------------------------------------------------------------------------------------------
    //Habilitar o deshabilitar la opción de cliente con descuento vigente

    ckbDsctoVig.addEventListener('change', () => {
        if (ckbDsctoVig.checked) {
            txtAreaCods.disabled = false;
            txtAreaCods.setAttribute('required',true);
            txtAreaCods.focus();
        } else {
            txtAreaCods.disabled = true;
            txtAreaCods.setAttribute('required',true);
        }
    });
  
    //Iniciar el cboMeses deshabilitado
    mesAplicar.disabled=true;

    //-------------------------------------------------------------------------------------------
    //Habilitar o deshabilitar el texto de nuevo plan
    //Si el check de nuevo plan está marcado "desactivar el campo de cantidad de meses"
    ckbNuevoPlan.addEventListener('change', () => {
        if (ckbNuevoPlan.checked) {
            cboNuevoPlan.disabled = false;
            mesAplicar.disabled = false;
            mesAplicar.setAttribute('required', true);
        } else {
            cboNuevoPlan.disabled = true;
            mesAplicar.disabled = true;
            mesAplicar.setAttribute('required', false);
            mesAplicar.value="";
        }
    });

    txtSuper.value = "GIANFRANCO PAZ";
    txtAreaCods.disabled = true;
    lblComprPago.textContent = "Compromiso de pago: " + mostrarFechComprPago();

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
        let promocion = document.getElementById('promocion').value;
        let cantidadMeses = cboCantMeses.options[cboCantMeses.selectedIndex].text;
        let mesesAplicar = formatearMes(mesAplicar.value);
        let sn = document.getElementById('snLlamada').value;
        let vbSupervisor = document.getElementById('vbSupervisor').value;

        let fecComprPago = mostrarFechComprPago();
        let clientDsctVig = document.getElementById('lblClienteDescVig').textContent;
        let codsOCC = txtAreaCods.value;
        let plan = cboNuevoPlan.options[cboNuevoPlan.selectedIndex].text;

        let numeroCliente = document.getElementById('numeroCliente').value;
        let usuarioE = document.getElementById('usuarioE').value;
        let subcampaña = document.getElementById('subcampaña').value;
        let segmento = cboSegmento.options[cboSegmento.selectedIndex].text;
        let ciclo = cboCiclo.options[cboCiclo.selectedIndex].text;

        //Escribir plantilla
        txtAreaResultadoParcial = `"TIPO DE SOLICITUD: Contención PORT OUT\nOperador: ${operador}\nPromoción ofrecida: ${promocion}\nCantidad de meses: ${cantidadMeses}\nSN de la llamada: ${sn}\nVB del supervisor: ${vbSupervisor}`;

        if (ckbFecComprPago.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nCompromiso de pago: ${fecComprPago}`;
        }

        if (ckbDsctoVig.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\n${clientDsctVig}(${codsOCC})`;
        }

        if (ckbNuevoPlan.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nNuevo plan: ${plan}\nMeses a aplicar: ${mesesAplicar}`;
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
        cboPromocion.value = "";
        cboCantMeses.selectedIndex=0;
        mesAplicar.value="";
        mesAplicar.setAttribute('required',true);
        txtSnLlamada.value="";
        ckbNuevoPlan.checked=false;
        cboNuevoPlan.selectedIndex=6;
        cboNuevoPlan.disabled=true;
        ckbFecComprPago.checked=false;
        ckbDsctoVig.checked=false;
        txtAreaCods.disabled=true;
        txtAreaCods.value="";
        txtAreaCods.setAttribute('required',true);
        txtAreaResultado.textContent="";
        txtNumeroCli.value="";
        txtSuper.value="GIANFRANCO PAZ";
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