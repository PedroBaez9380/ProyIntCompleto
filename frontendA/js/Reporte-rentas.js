$(document).ready(function() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Rentas/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        // console.log(result.result.renta)
        result.result.renta.forEach(function(renta) {
            var ID_renta = renta.iD_renta;
            var fecha_renta = renta.fecha_renta.substring(0, 10);
            var hora_renta = renta.fecha_renta.substring(11, 16);
            var fecha_devolucion = renta.fecha_devolucion.substring(0, 10);
            if (renta.fecha_devolucion_real == null){
                var fecha_devolucion_real = 'N/A'    
            } else {
                var fecha_devolucion_real = renta.fecha_devolucion_real.substring(0, 10);
            }
            
            var ID_cliente = renta.iD_cliente;
            var ID_empleado = renta.iD_empleado;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_renta}</td>
                    <td>${fecha_renta}</td>
                    <td>${hora_renta}</td>
                    <td>${fecha_devolucion}</td>
                    <td>${fecha_devolucion_real}</td>
                    <td>${ID_cliente}</td>
                    
                </tr>
            `);    
        });

        $('input[type="text"]').on('keyup', function() {
            var filters = [];

            $('input[type="text"]').each(function() {
                filters.push($(this).val().toLowerCase());
            });

            $('table tbody tr').each(function() {
                var row = $(this);
                var showRow = true;

                row.find('td').each(function(index) {
                    var cellText = $(this).text().toLowerCase();
                    var filterText = filters[index];

                    if (filterText && !cellText.includes(filterText)) {
                        showRow = false;
                    }
                });

                if (showRow) {
                    row.show();
                } else {
                    row.hide();
                }
            });
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los paises: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
});


