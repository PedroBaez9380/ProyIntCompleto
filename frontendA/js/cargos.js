$(document).ready(function() {
    traerCargos()

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_estado = $(this).find('td:eq(0)').text().trim();
        var dataId = $(this).find('td:eq(1)').attr('data-id');
        var Nombre = $(this).find('td:eq(2)').text().trim();
                
        $('#id-cargo').val(ID_estado);
        $('#rol').val(dataId);
        $('#descripcion').val(Nombre);
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
        if ($("#rol").val() === "" || $("#descripcion").val().trim() === "") {
        alert("Completa todos los campos antes de guardar.");
        return;  // Evita que se continúe si no están los campos completos
    }
        if ($("#id-cargo").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-cargo").val();
        }
        $.ajax({
            url: "https://localhost:7131/Cargos/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "id_cargo": ID,
                "descripcion": $("#descripcion").val(),
                "iD_rol": $('#rol').val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerCargos()
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
            url: "https://localhost:7131/Cargos/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_cargo": $("#id-cargo").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerCargos();
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

    $('#buscarCargos').on('input', function() {
        var textoBusqueda = $(this).val().toLowerCase();
        
        $('#tabla-cuerpo tr').each(function() {
            var coincide = false;
            $(this).find('td').each(function() {
                if ($(this).text().toLowerCase().includes(textoBusqueda)) {
                    coincide = true;
                    return false; 
                }
            });
            if (coincide) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

function limpiarCampos(){
    $('.fila-campos div textarea').val('');
    $('.fila-campos div select').val('default');
}

function deshabilitarCampos(){
    $('.fila-campos div textarea').attr('disabled', true);
    $('.fila-campos div select').attr('disabled', true);
}

function habilitarCampos(){
    $('#rol').attr('disabled', false);
    $('#descripcion').attr('disabled', false); 
}


function traerCargos() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Cargos/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.cargo)
        result.result.cargo.forEach(function(cargo) {
            var ID_cargo = cargo.iD_cargo;
            var ID_rol = cargo.iD_rol;
            var descripcion_rol = cargo.descripcion_rol
            var descripcion = cargo.descripcion;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_cargo}</td>
                    <td data-id="${ID_rol}">${descripcion_rol}</td>
                    <td>${descripcion}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los cargos: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

