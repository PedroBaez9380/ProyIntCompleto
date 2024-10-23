$(document).ready(function() {
    traerEstados()
    traerMunicipios()

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_municipio = $(this).find('td:eq(0)').text().trim();
        var Nombre = $(this).find('td:eq(1)').text().trim();
        var dataId = $(this).find('td:eq(2)').attr('data-id');

        
        $('#id-municipio').val(ID_municipio);
        $('#nombre-municipio').val(Nombre);
        $('#estado-de-municipio').val(dataId);
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
        if ($("#id-municipio").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-municipio").val();
        }
        $.ajax({
            url: "https://localhost:7131/Municipios/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_municipio": ID,
                "nombre_municipio": $("#nombre-municipio").val(),
                "iD_estado": $('#estado-de-municipio').val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerMunicipios()
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
            url: "https://localhost:7131/Municipios/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_municipio": $("#id-municipio").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerMunicipios();
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
    $('#nombre-municipio').attr('disabled', false);
    $('#estado-de-municipio').attr('disabled', false); 
}


function traerMunicipios() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Municipios/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.municipio)
        result.result.municipio.forEach(function(municipio) {
            var ID_municipio = municipio.iD_municipio;
            var Nombre = municipio.nombre_municipio;
            var ID_estado = municipio.iD_estado;
            var Nombre_estado = municipio.nombre_estado;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_municipio}</td>
                    <td>${Nombre}</td>
                    <td data-id="${ID_estado}">${Nombre_estado}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los municipios: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerEstados() {
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
            
            $('#estado-de-municipio').append(`
                <option value="${ID_estado}">${Nombre}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los estados: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}