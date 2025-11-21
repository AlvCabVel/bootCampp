$(function() {
    const addContactBtn = $('#addContactBtn');
    const addContactSection = $('#addContactSection');
    const saveContactBtn = $('#saveContactBtn');
    const contactList = $('#contactList');
    const mainForm = $('#mainForm');
    const cancelSaveContactBtn = $('#cancelSaveContactBtn');
    const sendSection = $('#sendSection');
    
    addContactBtn.on('click', () => { addContactSection.removeClass('d-none'); });
    cancelSaveContactBtn.on('click', () => { addContactSection.addClass('d-none'); });

    saveContactBtn.on('click', function() {
        const nombre = $('#nombreCompleto').val().trim();
        const alias = $('#aliasContacto').val().trim();
        if (!nombre) return alert('Nombre obligatorio');

        const li = `<li class="list-group-item"><label class="d-flex align-items-center gap-3"><input type="radio" name="selectedContact" value="${nombre}" class="form-check-input"><div><span class="fw-bold">${nombre}</span><small class="d-block text-muted">Alias: ${alias || 'Sin alias'}</small></div></label></li>`;
        contactList.append(li);
        $('#nombreCompleto, #rutContacto, #numeroCuenta, #aliasContacto').val("");
        addContactSection.addClass('d-none');
    });

    $(document).on('change', 'input[name="selectedContact"]', function() {
        sendSection.removeClass('d-none');
    });
    
    mainForm.on('submit', function(e) {
        e.preventDefault();
        const selectedContact = $('input[name="selectedContact"]:checked').val();
        const monto = parseFloat($('#enviarDinero').val());
        let saldoActual = parseFloat(localStorage.getItem("montoTotal")) || 0;

        if (!monto || monto <= 0) return alert('Monto inválido');
        if (monto > saldoActual) return alert('Saldo insuficiente');

        let nuevoSaldo = saldoActual - monto;
        localStorage.setItem("montoTotal", nuevoSaldo);

        const nuevaTransaccion = {
            fecha: new Date().toLocaleString(),
            monto: monto,
            tipo: "Transferencia",
            descripcion: `Envío a ${selectedContact}`
        };

        let historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
        historial.push(nuevaTransaccion);
        localStorage.setItem("historialMovimientos", JSON.stringify(historial));

        $('#feedback-message').html('<div class="alert alert-success">Transferencia realizada con éxito.</div>');
        $('#enviarDinero').val("");
        setTimeout(() => window.location.href = "menu.html", 2000);
    });
});