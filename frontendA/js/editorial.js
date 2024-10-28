$(document).ready(function() {
    traerEditoriales()

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_editorial = $(this).find('td:eq(0)').text().trim();
        var Nombre = $(this).find('td:eq(1)').text().trim();
        
        $('#id-editorial').val(ID_editorial);
        $('#nombre').val(Nombre);
        deshabilitarCampos();
    });

    $('#boton-nuevo').click(function() {
        habilitarCampos()
        limpiarCampos() 
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);
    });

    $('#boton-modificacion').click(function() {
        habilitarCampos()
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
    });

    $('#boton-guardar').click(function() {
        if($('#nombre').val() === ""){
            alert("Favor de introducir nombre de editorial");
            return;
        }

        var regex = /[A-Za-z]/;
        if (!regex.test($('#nombre').val())) {
            alert("El nombre debe contener al menos una letra y no puede ser solo símbolos o números");
            return;
        }

        // Obtener el valor ingresado
        var nuevoNombre = $('#nombre').val().trim().toLowerCase();
        var duplicado = false;

        // Verificar duplicados en la tabla
        $('#tabla-cuerpo tr').each(function() {
            var nombreActual = $(this).find('td').eq(1).text().trim().toLowerCase();
            if (nuevoNombre === nombreActual) {
                duplicado = true;
                return false; // Detener el bucle each si se encuentra un duplicado
            }
        });

        if (duplicado) {
            alert("Esta editorial ya existe. Por favor, ingrese una editorial diferente.");
            return;
        }
        
        if ($("#id-editorial").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-editorial").val();
        }
        $.ajax({
            url: "https://localhost:7131/Editoriales/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_editorial": ID,
                "nombre": $("#nombre").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerEditoriales()
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
        })
    });

    $('#boton-borrar').click(function() {
        $.ajax({
            url: "https://localhost:7131/Editoriales/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_editorial": $("#id-editorial").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerEditoriales();
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

function limpiarCampos(){
    $('.fila-campos div textarea').val('');
    $('.fila-campos div select').val('0');
}

function deshabilitarCampos(){
    $('.fila-campos div textarea').attr('disabled', true);
    $('.fila-campos div select').attr('disabled', true);
}

function habilitarCampos(){
    $('#nombre').attr('disabled', false);
}


function traerEditoriales() {
    $('#tabla-cuerpo').empty(); 
    $.ajax({
        url: "https://localhost:7131/Editoriales/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.editorial)
        result.result.editorial.forEach(function(editorial) {
            var ID_editorial = editorial.iD_editorial;
            var Nombre = editorial.nombre;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_editorial}</td>
                    <td>${Nombre}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer las editoriales: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}