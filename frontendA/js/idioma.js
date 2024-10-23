$(document).ready(function() {
    traerIdiomas();

    $('#tabla-cuerpo').on('click', 'tr', function() {
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_idioma = $(this).find('td:eq(0)').text().trim();
        var Nombre = $(this).find('td:eq(1)').text().trim();
        
        $('#id-idioma').val(ID_idioma);
        $('#nombre').val(Nombre);
        deshabilitarCampos();
    });

    $('#boton-nuevo').click(function() {
        habilitarCampos();
        limpiarCampos();
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);
        $('#nombre').focus(); // Enfocar el campo de nombre
    });

    $('#boton-modificacion').click(function() {
        habilitarCampos();
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
    });

    $('#boton-guardar').click(function() {
        // Validar si los campos están llenos
        if ($("#nombre").val().trim() === "") {
            alert("Por favor, llene todos los apartados para guardar.");
            return; // Detener la ejecución si los campos están vacíos
        }

        var option, typemod, ID;
        if ($("#id-idioma").val() === "" ){
            option = "Guardar";
            typemod = 'POST';
            ID = null;
        } else {
            option = "Actualizar";
            typemod = 'PUT';
            ID = $("#id-idioma").val();
        }
        $.ajax({
            url: "https://localhost:7131/Idiomas/" + option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_idioma": ID,
                "nombre": $("#nombre").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerIdiomas();
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
            url: "https://localhost:7131/Idiomas/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_idioma": $("#id-idioma").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerIdiomas();
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
    $('#nombre').attr('disabled', false);
}

function validarSoloLetras(campo) {
    // Limitar a 30 caracteres
    if (campo.value.length > 30) {
        campo.value = campo.value.substring(0, 30);
        alert('El máximo permitido es de 30 caracteres.');
    }
    // Expresión regular que permite solo letras y espacios
    var regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regexSoloLetras.test(campo.value)) {
        // Reemplaza los caracteres que no sean letras
        campo.value = campo.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        alert('Solo se permiten letras. No se permiten números.');
    }
}

function traerIdiomas() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Idiomas/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.idiomas);
        result.result.idiomas.forEach(function(idioma) {
            var ID_idioma = idioma.iD_idioma;
            var Nombre = idioma.nombre;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_idioma}</td>
                    <td>${Nombre}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los idiomas: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}