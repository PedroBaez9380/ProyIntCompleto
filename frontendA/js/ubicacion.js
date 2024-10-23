$(document).ready(function() {
    traerUbicaciones();

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_ubicacion = $(this).find('td:eq(0)').text().trim();
        var seccion = $(this).find('td:eq(1)').text().trim();
        var estanteria = $(this).find('td:eq(2)').text().trim();
        
        $('#id-ubicacion').val(ID_ubicacion);
        $('#seccion').val(seccion);
        $('#estanteria').val(estanteria);
        deshabilitarCampos();
    });

    $('#boton-nuevo').click(function() {
        habilitarCampos();
        limpiarCampos();
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);
    });

    $('#boton-modificacion').click(function() {
        habilitarCampos();
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
    });

    $('#boton-guardar').click(function() {

        // Verificar si los campos están vacíos
        if ($("#seccion").val().trim() === "" || $("#estanteria").val().trim() === "") {
            alert("Debe llenar todos los apartados para poder guardar.");
            return; // Detener la ejecución si los campos no están completos
        }

        var estanteria = parseInt($('#estanteria').val(), 10);
        if (isNaN(estanteria)) {
            alert("Favor de introducir una estanteria valida.");
            return;
        }

        if ($("#id-ubicacion").val() === "" ){
            option = "Guardar";
            typemod = 'POST';
            ID = null;
        } else {
            option = "Actualizar";
            typemod = 'PUT';
            ID = $("#id-ubicacion").val();
        }
        $.ajax({
            url: "https://localhost:7131/Ubicaciones/" + option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_ubicacion": ID,
                "seccion": $("#seccion").val(),
                "estanteria": $("#estanteria").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerUbicaciones();
                    alert("Guardado exitoso!");
                    $('#boton-guardar').attr('disabled', true);
                    $('#boton-nuevo').attr('disabled', false);
                    $('#boton-modificacion').attr('disabled', true);
                    $('#boton-borrar').attr('disabled', true);
                } else {
                    console.error(response.message);
                    alert("Hubo un problema al intentar guardar.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Hubo un error en la solicitud:", error);
                alert("Hubo un problema al intentar guardar.");
            }
        });
    });

    $('#boton-borrar').click(function() {
        $.ajax({
            url: "https://localhost:7131/Ubicaciones/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_ubicacion": $("#id-ubicacion").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerUbicaciones();
                    alert("Borrado exitoso!");
                    $('#boton-guardar').attr('disabled', true);
                    $('#boton-nuevo').attr('disabled', false);
                    $('#boton-modificacion').attr('disabled', true);
                    $('#boton-borrar').attr('disabled', true);
                } else {
                    console.error(response.message);
                    alert("Hubo un problema al intentar eliminar.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Hubo un error en la solicitud:", error);
                alert("Hubo un problema al intentar eliminar.");
            }
        });
    });
});

function limpiarCampos() {
    $('.fila-campos div textarea').val('');
    $('.fila-campos div select').val('0');
}

function deshabilitarCampos() {
    $('.fila-campos div textarea').attr('disabled', true);
    $('.fila-campos div select').attr('disabled', true);
}

function habilitarCampos() {
    $('#seccion').attr('disabled', false);
    $('#estanteria').attr('disabled', false);
}


function traerUbicaciones() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Ubicaciones/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function(result) {
        console.log(result.result.ubicaciones);
        result.result.ubicaciones.forEach(function(ubicacion) {
            var ID_ubicacion = ubicacion.iD_ubicacion;
            var Seccion = ubicacion.seccion;
            var Estanteria = ubicacion.estanteria;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_ubicacion}</td>
                    <td>${Seccion}</td>
                    <td>${Estanteria}</td>
                </tr>
            `);
        });
    }).fail(function(xhr, status, error) {
        alert("Hubo un problema al traer las ubicaciones: " + error + "\nStatus: " + status);
        console.error(xhr);
    });

    // Limitar los caracteres y mostrar alerta si excede 20
    $('#seccion, #estanteria').off('input').on('input', function() {
        var $this = $(this);
        if ($this.val().length > 20) {
            $this.val($this.val().substring(0, 20)); // Limitar a 20 caracteres
            alert("El máximo permitido es de 20 caracteres.");
        }
    });
}