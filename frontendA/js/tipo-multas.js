$(document).ready(function() {
    traerTiposMultas()

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_tipo_multa = $(this).find('td:eq(0)').text().trim();
        var descripcion = $(this).find('td:eq(1)').text().trim();
        var Tarifa = $(this).find('td:eq(2)').text().trim();
        
        $('#id-tipo-multa').val(ID_tipo_multa);
        $('#tarifa').val(Tarifa);
        $('#descripcion').val(descripcion);
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

                // Validación de campos
        const descripcion = $("#descripcion").val().trim();
        const tarifa = $("#tarifa").val().trim();
        
        if (!descripcion) {
            alert("La descripción es obligatoria.");
            return;
        }
        if (!/^\d{1,8}$/.test(tarifa)) {
            alert("La tarifa debe ser un número de hasta 4 dígitos.");
            return;
        }

        if ($("#id-tipo-multa").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-tipo-multa").val();
        }
        $.ajax({
            url: "https://localhost:7131/TiposMulta/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_tipo_multa": ID,
                "descripcion": $("#descripcion").val(),
                "tarifa": $("#tarifa").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerTiposMultas()
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
            url: "https://localhost:7131/TiposMulta/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_tipo_multa": $("#id-tipo-multa").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerTiposMultas();
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
    $('#tarifa').attr('disabled', false);
    $('#descripcion').attr('disabled', false);
}


function traerTiposMultas() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/TiposMulta/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.tiposMulta)
        result.result.tiposMulta.forEach(function(TiposMulta) {
            var ID_tipo_multa = TiposMulta.iD_tipo_multa;
            var descripcion = TiposMulta.descripcion;
            var tarifa = TiposMulta.tarifa
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_tipo_multa}</td>
                    <td>${descripcion}</td>
                    <td>${tarifa}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los paises: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}
