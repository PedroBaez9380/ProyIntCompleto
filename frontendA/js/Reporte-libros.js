$(document).ready(function() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Libros/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        result.result.libros.forEach(function(libro) {
            var ID_libro = libro.iD_libro;
            var titulo = libro.titulo;
            var numeroISBN = libro.numero_ISBN;
            var nombre_editorial = libro.nombre_editorial;
            var year_publicacion = libro.year_publicacion.substring(0, 4);
            var n_paginas = libro.n_paginas;
            var tipo_pasta = libro.tipo_pasta;
            var ubicacion = libro.seccion_ubicacion + "-" + libro.estanteria_ubicacion;
            var nombre_idioma = libro.nombre_idioma;
            var descripcion_condicion = libro.descripcion_condicion;

            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_libro}</td>
                    <td>${titulo}</td>
                    <td>${numeroISBN}</td>
                    <td>${nombre_editorial}</td>
                    <td>${year_publicacion}</td>
                    <td>${n_paginas}</td>
                    <td>${tipo_pasta}</td>
                    <td>${ubicacion}</td>
                    <td>${nombre_idioma}</td>
                    <td>${descripcion_condicion}</td>
                </tr>
            `);    
        });

        
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los libros: " + error + "\nStatus: " + status);
        console.error(xhr);
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

});


