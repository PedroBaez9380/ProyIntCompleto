document.addEventListener('DOMContentLoaded', function() {
    var botonDesplegable = document.querySelector('#boton-multas-catalogo button');
    var contenedorMenu = document.querySelector('#boton-multas-catalogo .menu-desplegable');

    botonDesplegable.addEventListener('click', function() {
        contenedorMenu.classList.toggle('active');
    });
    //
    var botonDesplegableCatalogoLibro = document.querySelector('#boton-catalogos-libros button');
    var contenedorMenuCatalogoLibro = document.querySelector('#boton-catalogos-libros .menu-desplegable');

    botonDesplegableCatalogoLibro.addEventListener('click', function() {
        contenedorMenuCatalogoLibro.classList.toggle('active');
    });
    //
    var botonDesplegableCatalogoEmpleado = document.querySelector('#boton-empleados-catalogo button');
    var contenedorMenuCatalogoEmpleado = document.querySelector('#boton-empleados-catalogo .menu-desplegable');

    botonDesplegableCatalogoEmpleado.addEventListener('click', function() {
        contenedorMenuCatalogoEmpleado.classList.toggle('active');
    });
    //
    var botonDesplegableInformacion = document.querySelector('#boton-informacion button');
    var contenedorMenuInformacion = document.querySelector('#boton-informacion #menu-desplegable-info');

    botonDesplegableInformacion.addEventListener('click', function() {
        contenedorMenuInformacion.classList.toggle('active');
        console.log('se clickeo')
    });

    //Reportes
    var botonDesplegableReportes = document.querySelector('#boton-reportes button');
    var contenedorMenuReportes = document.querySelector('#boton-reportes .menu-desplegable');

    botonDesplegableReportes.addEventListener('click', function() {
        contenedorMenuReportes.classList.toggle('active');
    });

    //Buscar

    $('input[type="text"]').on('keyup', function() {
        var filterText = $(this).val().toLowerCase();
    
        $('table tbody tr').each(function() {
            var row = $(this);
            var showRow = false;
    
            row.find('td').each(function() {
                var cellText = $(this).text().toLowerCase();
    
                if (cellText.includes(filterText)) {
                    showRow = true; // Si hay coincidencia, mostramos la fila
                }
            });
    
            if (showRow) {
                row.show();
            } else {
                row.hide();
            }
        });
    });
    

});


