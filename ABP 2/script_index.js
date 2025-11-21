$(function(){
    const emailCorrecto = "X@gmail.com";
    const passwordCorrecto = "1234";
    
    $("#loginForm").on("submit", function(e){
        e.preventDefault();
        let emailIngresado = $("#email").val();
        let passwordIngresado = $("#password").val();
        let alertContainer = $("#alert-container");

        if(emailIngresado == emailCorrecto && passwordIngresado == passwordCorrecto){
            alertContainer.html(`
                <div class="alert alert-success" role="alert">
                    Acceso aprobado. Redirigiendo...
                </div>
            `);
            setTimeout(function(){
                window.location.href="./menu.html";
            }, 1500);
        } else {
            alertContainer.html(`
                <div class="alert alert-danger" role="alert">
                    Acceso denegado. Verifica tus datos.
                </div>
            `);
        }
    });
});