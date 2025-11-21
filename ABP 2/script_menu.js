$(function(){
    let montoActual = $("#montoActual");
    let saldo = parseFloat(localStorage.getItem("montoTotal")) || 0;
    montoActual.text(saldo.toFixed(2));

    $("#btnDepositar").on("click", function(){
        $("#navigation-message").text("Redirigiendo a Depósitos...");
        setTimeout(() => window.location.href = "deposit.html", 1000);
    });

    $("#btnTransferir").on("click", function(){
        $("#navigation-message").text("Redirigiendo a Transferencias...");
        setTimeout(() => window.location.href = "sendmoney.html", 1000);
    });

    $("#btnMovimientos").on("click", function(){
        $("#navigation-message").text("Redirigiendo a Movimientos...");
        setTimeout(() => window.location.href = "transactions.html", 1000);
    });
});