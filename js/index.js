const cardDescuento = document.getElementById('cardDescuento');
const cardbono = document.getElementById('cardBono');
const cardNcFundada = document.getElementById('cardNcFundada');
const cardNcNoFundada = document.getElementById('cardNcNoFundada');
const cardDescuentoBono = document.getElementById('cardDescuentoBono');
const cardBajaMigracion = document.getElementById('cardMigracionPrepago');

cardDescuento.addEventListener('click', () => {
    window.location.href = "descuento.html";
});

cardbono.addEventListener('click', () => {
    window.location.href = "bono.html";
});

cardNcFundada.addEventListener('click', () => {
    window.location.href = "notaCreditoFundada.html";
});

cardNcNoFundada.addEventListener('click', () => {
    window.location.href = "notaCreditoNoFundada.html";
});

cardDescuentoBono.addEventListener('click', () => {
    window.location.href = "doblebeneficio.html";
});

cardBajaMigracion.addEventListener('click', () => {
    window.location.href = "contencionBajaPrepago.html";
});