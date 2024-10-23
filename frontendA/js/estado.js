$(document).ready(function() {
    traerPaises()
    traerEstados()

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_estado = $(this).find('td:eq(0)').text().trim();
        var Nombre = $(this).find('td:eq(1)').text().trim();
        var dataId = $(this).find('td:eq(2)').attr('data-id');

        
        $('#id-estado').val(ID_estado);
        $('#nombre-estado').val(Nombre);
        $('#pais-de-estado').val(dataId);
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
        if ($("#nombre-estado").val().trim() === "" || $('#pais-de-estado').val() === "0") {
            alert("Por favor complete todos los campos.");
            return; // Detiene el proceso si los campos no están completos
        }

        if ($("#id-estado").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-estado").val();
        }
        $.ajax({
            url: "https://localhost:7131/Estados/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_estado": ID,
                "nombre_estado": $("#nombre-estado").val(),
                "iD_pais": $('#pais-de-estado').val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerEstados()
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
            url: "https://localhost:7131/Estados/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_estado": $("#id-estado").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerEstados();
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
    $('#nombre-estado').attr('disabled', false);
    $('#pais-de-estado').attr('disabled', false); 
}


function traerEstados() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Estados/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.estado)
        result.result.estado.forEach(function(estado) {
            var ID_estado = estado.iD_estado;
            var Nombre = estado.nombre_estado;
            var ID_pais = estado.iD_pais;
            var Nombre_pais = estado.nombre_pais;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_estado}</td>
                    <td>${Nombre}</td>
                    <td data-id="${ID_pais}">${Nombre_pais}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los estados: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerPaises() {
    $.ajax({
        url: "https://localhost:7131/Paises/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.paises)
        result.result.paises.forEach(function(pais) {
            var ID_pais = pais.iD_pais;
            var Nombre = pais.nombre_pais;
            
            $('#pais-de-estado').append(`
                <option value="${ID_pais}">${Nombre}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los paises: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}