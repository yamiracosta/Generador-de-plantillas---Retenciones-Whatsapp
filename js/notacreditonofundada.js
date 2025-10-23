document.addEventListener('DOMContentLoaded', () => {
    const txtCampaña = document.getElementById('campaña');
    const txtIMR = document.getElementById('imrText');
    const ckbIMR = document.getElementById('imrCheck');
    const txtMedidaCorrectiva = document.getElementById('medidaCorrectiva');
    const txtTipoRegistro = document.getElementById('tipoRegistro');
    const txtSupervisor = document.getElementById('vbSupervisor');
    const botonCalcularMontoSinIGV = document.getElementById('btnCalcularMontoSinIGV');
    const txtMontoConIGV = document.getElementById('montoConIGV');
    const txtMontoSinIGV = document.getElementById('montoSinIGV');
    const btnNuevaPlantilla = document.getElementById('btnNuevaPlantilla');
    const txtNumCliente = document.getElementById('numeroCliente');
    const cboCallCenter = document.getElementById('callCenter');
    const txtNumRecibo = document.getElementById('nroRecibo');
    const txtAreaDescRealiz = document.getElementById('descarteRealizado');
    const cboMotivo = document.getElementById('motivo');
    const txtSnLlamada = document.getElementById('snLlamada');
    const txtAreaResultado = document.getElementById('resultado');
    const form = document.getElementById('formCliente');
    const txtUsuarioE = document.getElementById('usuarioE');
    const cboSubcampaña = document.getElementById('subcampaña');
    const txtAreaDetalle = document.getElementById('detalle');
    const btnCopiar = document.getElementById('btnCopiar');
    const ckbSegmento = document.getElementById('segmentoCheck');
    const ckbCiclo = document.getElementById('cicloCheck');
    const cboSegmento = document.getElementById('segmentoCbo');
    const cboCiclo = document.getElementById('cicloCbo');

    //Inicializar los campos con textos predefinidos:
    txtCampaña.value = "RETENCIONES WHATSAPP";
    txtIMR.value = `"No afecta a IMR"`;
    txtMedidaCorrectiva.value = "Nota de Crédito";
    txtTipoRegistro.value = "No fundado";
    txtSupervisor.value = "GIANFRANCO PAZ";

    //Botón que calcula IGV:
    botonCalcularMontoSinIGV.addEventListener('click', () => {
        calcularMontoSinIGV();
    });

    function calcularMontoSinIGV() {
        let montoConIGV = txtMontoConIGV.value;
        let montoSinIGV = 0;
        if (montoConIGV.trim() === "") {
            txtMontoConIGV.focus();
            alert('Ingrese un monto válido');
        } else {
            montoSinIGV = montoConIGV / 1.18;
            txtMontoSinIGV.value = Math.floor(montoSinIGV * 100) / 100;
        }
    }

    //Detectar cuando el botón le da a Enter
    txtMontoConIGV.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            calcularMontoSinIGV();
        }
    });

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

    //Limpiar los campos con el botón "NUEVA PLANTILLA"
    btnNuevaPlantilla.addEventListener('click', () => {
        txtNumCliente.value = "";
        cboCallCenter.selectedIndex = 1;
        txtCampaña.value = "RETENCIONES WHATSAPP";
        txtIMR.value = `"No afecta a IMR"`;
        txtIMR.disabled = true;
        ckbIMR.checked = false;
        txtNumRecibo.value = "";
        txtMontoConIGV.value = "";
        txtMontoSinIGV.value = "";
        cboMotivo.selectedIndex = 0;
        txtAreaDetalle.value = "";
        txtAreaDescRealiz.value = "";
        txtSnLlamada.value = "";
        txtSupervisor.value = "GIANFRANCO PAZ";
        txtAreaResultado.value = "";
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

    //BOTON "GENERAR PLANTILLA":
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        //Limpiar el contenedor
        txtAreaResultado.textContent = "";

        //Establecer una variable temporal que luego adicionaremos otros valores de corresponder
        let txtAreaResultadoParcial = "";

        //Obtener valores de los campos
        let numCliente = txtNumCliente.value;
        let usuarioE = txtUsuarioE.value;
        let subCampaña = cboSubcampaña.options[cboSubcampaña.selectedIndex].text;
        let callCenter = cboCallCenter.options[cboCallCenter.selectedIndex].text;
        let campaña = txtCampaña.value;
        let imr = txtIMR.value;
        let nroRecibo = txtNumRecibo.value;
        let motivo = cboMotivo.options[cboMotivo.selectedIndex].text;
        let montoSinIGV = txtMontoSinIGV.value;
        let detalleDisc = txtAreaDetalle.value;
        let descarte = txtAreaDescRealiz.value;
        let medidaCorrectiva = txtMedidaCorrectiva.value;
        let tipoRegistro = txtTipoRegistro.value;
        let sn = txtSnLlamada.value;
        let vbSupervisor = txtSupervisor.value;
        let segmento = cboSegmento.options[cboSegmento.selectedIndex].text;
        let ciclo = cboCiclo.options[cboCiclo.selectedIndex].text;

        //Escribir plantilla
        txtAreaResultadoParcial = `N° de teléfono: ${numCliente}\nNombre del Call Center: ${callCenter}\nCampaña: ${campaña}\nIMR: ${imr}\nN° de recibo: ${nroRecibo}\nMotivo: ${motivo}\nImporte sin IGV: S/. ${montoSinIGV}\nDetalle de la disconformidad: ${detalleDisc}\nDescarte realizado: ${descarte}\nMedida correctiva: ${medidaCorrectiva}\nTipo de registro: ${tipoRegistro}\nSN de la llamada: ${sn}\nVB del supervisor: ${vbSupervisor}\n\nCampaña: ${subCampaña}\nN° de teléfono: ${numCliente}\nUsuario: ${usuarioE}`;

        if (ckbSegmento.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nSegmento: ${segmento}`;
        }

        if (ckbCiclo.checked) {
            txtAreaResultadoParcial = `${txtAreaResultadoParcial}\nCiclo de facturación: ${ciclo}`;
        }

        //Mostrar la plantilla generada
        txtAreaResultado.value = txtAreaResultadoParcial;
    });

    //Botón para copiar la plantilla generada
    btnCopiar.addEventListener('click', () => {
        txtAreaResultado.select();
        txtAreaResultado.setSelectionRange(0, 99999); // Para móviles
        navigator.clipboard.writeText(txtAreaResultado.value)
    });
})