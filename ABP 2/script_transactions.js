$(function() {
    const listaElement = $("#listaMovimientos");
    const filtroSelect = $("#filtroTipo");
    
    let historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];

    function renderizarLista(lista) {
        listaElement.empty();
        if(lista.length === 0) {
            listaElement.append('<tr><td colspan="4" class="text-center">No hay movimientos registrados.</td></tr>');
            return;
        }

        lista.forEach(mov => {
            let colorMonto = mov.tipo === "Depósito" ? "text-success" : "text-danger";
            let signo = mov.tipo === "Depósito" ? "+" : "-";
            
            let row = `
                <tr>
                    <td>${mov.fecha}</td>
                    <td>${mov.descripcion}</td>
                    <td><span class="badge badge-${mov.tipo === 'Depósito' ? 'success' : 'warning'}">${mov.tipo}</span></td>
                    <td class="${colorMonto} font-weight-bold">${signo}$${parseFloat(mov.monto).toFixed(2)}</td>
                </tr>
            `;
            listaElement.append(row);
        });
    }

    renderizarLista(historial);

    filtroSelect.on("change", function() {
        let tipoSeleccionado = $(this).val();
        if (tipoSeleccionado === "todos") {
            renderizarLista(historial);
        } else {
            let filtrados = historial.filter(mov => mov.tipo === tipoSeleccionado);
            renderizarLista(filtrados);
        }
    });
});