$(document).ready(function() {
    traerGeneros()

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_genero = $(this).find('td:eq(0)').text().trim();
        var Nombre = $(this).find('td:eq(1)').text().trim();
        
        $('#id-genero').val(ID_genero);
        $('#nombre').val(Nombre);
        deshabilitarCampos();
    });

    $('#boton-nuevo').click(function() {
        habilitarCampos()
        limpiarCampos() 
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
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
            alert("Favor de introducir nombre del Genero");
            return;
        }

        var regex = /^[A-Za-z]+$/;
        if (!regex.test($('#nombre').val())) {
            alert("El nombre solo debe contener letras");
            return;
        }
        
        if ($("#id-genero").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-genero").val();
        }
        $.ajax({
            url: "https://localhost:7131/Generos/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_genero": ID,
                "nombre": $("#nombre").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerGeneros()
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
            url: "https://localhost:7131/Generos/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_genero": $("#id-genero").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerGeneros();
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


function traerGeneros() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Generos/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.generos)
        result.result.generos.forEach(function(genero) {
            var ID_genero = genero.iD_genero;
            var Nombre = genero.nombre;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_genero}</td>
                    <td>${Nombre}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los generos: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}