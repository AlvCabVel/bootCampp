$(function(){
    const botonDeposito = $("#botonDeposito");
    let inputDepositAmount = $("#depositAmount");
    let saldoDisplay = $("#saldoActualDisplay");
    let alertContainer = $("#alert-container");
    let leyenda = $("#leyendaDeposito");

    let saldoInicial = parseFloat(localStorage.getItem("montoTotal")) || 0;
    saldoDisplay.text(saldoInicial.toFixed(2));
    
    botonDeposito.on("click", function(e){
        e.preventDefault();
        let montoADepositar = parseFloat(inputDepositAmount.val()); 
        
        if (isNaN(montoADepositar) || montoADepositar <= 0) {
            alertContainer.html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Por favor ingrese un monto válido.<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
            inputDepositAmount.val(""); 
            return;
        } else {
            let montoActual = parseFloat(localStorage.getItem("montoTotal")) || 0;
            let nuevoMonto = montoActual + montoADepositar;
            localStorage.setItem("montoTotal", nuevoMonto);

            const fechaHoy = new Date().toLocaleString(); 
            let nuevaTransaccion = {
                fecha: fechaHoy,
                monto: montoADepositar,
                tipo: "Depósito",
                descripcion: "Depósito en cuenta"
            };

            let historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
            historial.push(nuevaTransaccion);
            localStorage.setItem("historialMovimientos", JSON.stringify(historial));

            inputDepositAmount.val(""); 
            saldoDisplay.text(nuevoMonto.toFixed(2));

            alertContainer.html('<div class="alert alert-success alert-dismissible fade show" role="alert">¡Depósito exitoso! Redirigiendo...<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
            leyenda.text(`Se han depositado $${montoADepositar.toFixed(2)} correctamente.`);

            setTimeout(function(){
                window.location.href = "./menu.html";
            }, 2000);
        }
    });
});