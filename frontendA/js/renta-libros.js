$(document).ready(function() {
    traerRentas();

    $('#tabla-cuerpo').on('click', 'tr', function() {
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);

        var ID_renta = $(this).find('td:eq(0)').text().trim();

        $('#id-renta').val(ID_renta);
        $('#fecha-renta').val($(this).find('td:eq(1)').text().trim());
        $('#hora-renta').val($(this).find('td:eq(2)').text().trim());
        $('#fecha-devolucion').val($(this).find('td:eq(3)').text().trim());
        $('#fecha-devolucion-real').val($(this).find('td:eq(4)').text().trim());
        $('#id-cliente').val($(this).find('td:eq(5)').text().trim());
        $('#id-empleado').val($(this).find('td:eq(6)').text().trim());

        if($(this).find('td:eq(4)').text().trim() == "") {

        }

        traerDetalleRentas(ID_renta);
        deshabilitarCampos();
    });

    $('.boton-agregar-posicion').click(function() {
        var ID_libro = $('#id-libro').val();
        traerDatosLibro(ID_libro);
    });

    $('#boton-nuevo').click(function() {
        habilitarCampos();
        limpiarCampos();
        $('#fecha-devolucion-real').attr('disabled', true);
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
    });

    $('#boton-modificacion').click(function() {
        deshabilitarCampos();
        $('#fecha-devolucion-real').attr('disabled', false);
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
        $('#fecha-devolucion').attr('disabled', true);
    });

    $('#boton-guardar').click(function() {
        // Validación de campos vacíos
        if ($("#fecha-devolucion").val() === "" || $("#id-cliente").val() === "" 
        //|| $("#id-libro").val() === ""
        ) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Validación de ID
        var ID_cliente = $("#id-cliente").val();
        //var ID_libro = $("#id-libro").val();
        if (!/^\d{1,5}$/.test(ID_cliente) 
        //|| !/^\d{1,5}$/.test(ID_libro)
        ) {
            alert("Los campos ID Cliente e ID Libro solo deben contener números y un máximo de 5 caracteres.");
            return;
        }

        var option;
        var typemod;
        var ID;

        if ($("#id-renta").val() === "") {
            option = "Guardar";
            typemod = 'POST';
            ID = null;
        } else {
            option = "Actualizar";
            typemod = 'PUT';
            ID = $("#id-renta").val();
        }
        
        $.ajax({
            url: "https://localhost:7131/Rentas/" + option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_renta": ID,
                "fecha_devolucion": $("#fecha-devolucion").val(),
                "fecha_devolucion_real": $("#fecha-devolucion-real").val(),
                "iD_cliente": $("#id-cliente").val(),
            }),
            crossDomain: true,
            success: function(response) {
                var ID_ultima_renta;
                if (response.success === "True") {
                    $.ajax({
                        url: "https://localhost:7131/Rentas/TraerUltimaRenta",
                        type: 'GET',
                        dataType: 'json',
                        crossDomain: true,
                        async: false
                    }).done(function(result) {
                        result.result.renta.forEach(function(renta) {
                            ID_ultima_renta = renta.iD_renta;
                            $('#tabla-cuerpo-detalle').find('tr').each(function() {
                                var ID_libro = $(this).find('td[data-id-libro]').data('id-libro');
                                var ID_condicion = $(this).find('td[data-id-condicion]').data('id-condicion');
                                $.ajax({
                                    url: "https://localhost:7131/DetalleRentas/Guardar",
                                    type: 'POST',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    data: JSON.stringify({
                                        "iD_renta": ID_ultima_renta,
                                        "iD_libro": ID_libro,
                                        "iD_condicion": ID_condicion
                                    }),
                                    success: function(response) {
                                        console.log(response.message);
                                    },
                                    error: function(xhr, status, error) {
                                        alert("Ocurrió un error");
                                    }
                                });
                            });
                        });

                        if ($("#fecha-devolucion-real").val() != "") {
                            var renta_completa = 1; //Para solicitar multa
                        } 

                        setTimeout(function() {
                            limpiarCampos();
                            deshabilitarCampos();
                            traerRentas();
                            alert("Guardado exitoso!");
                            $('#boton-guardar').attr('disabled', true);
                            $('#boton-nuevo').attr('disabled', false);
                            $('#boton-modificacion').attr('disabled', true);
                            $('#boton-borrar').attr('disabled', true);

                            if (renta_completa == 1) {
                                if (confirm("¿Aplicar multa a esta renta?")) {
                                    window.location.href = "gesiton-multas.html?id=" + ID_ultima_renta; // Redirigir a la nueva página con el ID como parámetro
                                }
                            }
                        }, 1000);
                    }).fail(function(xhr, status, error) {
                        alert("Hubo un problema al extraer el id de renta: " + error + "\nStatus: " + status);
                        console.error(xhr);
                    });
                } else {
                    console.error(response.message);
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("Hubo un error en la solicitud:", error);
                alert("Hubo un problema al comunicarse con el servidor.");
            }
        });
    });

    // Validación de caracteres en idCliente e idLibro
    $('#id-cliente, #id-libro').on('keypress', function(e) {
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode < 48 || charCode > 57) { // Solo permitir números
            e.preventDefault();
        }
    });

    // Limitar el número de caracteres a 5
    $('#id-cliente, #id-libro').on('input', function() {
        if ($(this).val().length > 5) {
            $(this).val($(this).val().slice(0, 5)); // Limitar a 5 caracteres
        }
    });

    $(document).on('click', '.eliminar-posicion', function() {
        var fila = $(this).closest('tr');
        fila.remove();
    });
});

function limpiarCampos() {
    $('.fila-campos div textarea').val('');
    $('.fila-campos div select').val('default');
    $('#tabla-cuerpo-detalle').empty();
    $('#id-libro').val('');
    $('#fecha-devolucion').val('');
    $('#fecha-devolucion-real').val('');
}

function deshabilitarCampos() {
    $('.fila-campos div textarea').attr('disabled', true);
    $('.fila-campos div select').attr('disabled', true);
    $('#id-libro').attr('disabled', true);
    $('.boton-agregar-posicion').attr('disabled', true);
    $('#fecha-devolucion').attr('disabled', true);
    $('#fecha-devolucion-real').attr('disabled', true);
}

function habilitarCampos() {
    $('#fecha-devolucion').attr('disabled', false);
    $('#fecha-devolucion-real').attr('disabled', false);
    $('#id-cliente').attr('disabled', false);
    $('#id-empleado').attr('disabled', false);
    $('#id-libro').attr('disabled', false);
    $('.boton-agregar-posicion').attr('disabled', false);
}

function traerDetalleRentas(ID_renta) {
    $('#tabla-cuerpo-detalle').empty();
    $.ajax({
        url: "https://localhost:7131/DetalleRentas/Traer/" + ID_renta,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.detalleRenta)
        result.result.detalleRenta.forEach(function(detalleRenta) {
            var ID_detalle_renta = detalleRenta.iD_detalle_renta;
            var ID_libro = detalleRenta.iD_libro;
            var ID_condicion = detalleRenta.iD_condicion;
            var descripcion_condicion = detalleRenta.descripcion;
            
            $('#tabla-cuerpo-detalle').append(`
                <tr>
                    <td data-id="${ID_detalle_renta}">${ID_libro}</td>
                    <td data-id="${ID_condicion}">${descripcion_condicion}</td>
                    <td><button class="eliminar-posicion" disabled>X</button></td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los paises: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerRentas() {
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
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los paises: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerDatosLibro(ID_libro) {
    $.ajax({
        url: "https://localhost:7131/Libros/TraerUno/" + ID_libro,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {

        if (result.result.libros == 0){
            alert("Libro con el id " + ID_libro + " no encontrado" );
            return;
        }
        //console.log(result.result.libros)
        result.result.libros.forEach(function(libros) {
            var ID_libro = libros.iD_libro;
            var titulo = libros.titulo;
            var ID_condicion = libros.iD_condicion;
            var descripcion_condicion = libros.descripcion_condicion;

            $('#tabla-cuerpo-detalle').append(`
                <tr>
                    <td data-id-libro="${ID_libro}">${titulo}</td>
                    <td data-id-condicion="${ID_condicion}">${descripcion_condicion}</td>
                    <td><button class="eliminar-posicion">X</button></td>
                </tr>
            `); 
            $('#id-libro').val('')
                
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los datos del libro: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function guardarDetalleRenta(ID_ultima_renta) {
    $('#tabla-cuerpo-detalle').find('tr').each(function() {
        var ID_libro = $(this).find('td[data-id-libro]').data('id-libro');
        var ID_condicion = $(this).find('td[data-id-condicion]').data('id-condicion');
        
        $.ajax({
            
            url: "https://localhost:7131/DetalleRentas/Guardar",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_renta": ID_ultima_renta,
                "iD_libro": ID_libro,
                "iD_condicion": ID_condicion
            }),
            success: function(response) {
                console.log(ID_libro)
            },
            error: function(xhr, status, error) {
                
            }
        });
    });
}
