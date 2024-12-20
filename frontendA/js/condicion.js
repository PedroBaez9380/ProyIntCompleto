$(document).ready(function() {
    traerCondiciones()

    // Restringir solo letras y símbolos, excluyendo números
    $('#descripcion').on('input', function () {
        // Obtener el valor actual del campo
        var value = $(this).val();

        // Eliminar cualquier carácter que no sea una letra o un símbolo
        value = value.replace(/[^A-Za-z!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]/g, '');

        // Actualizar el campo con el valor modificado
        $(this).val(value);
    });

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_condicion = $(this).find('td:eq(0)').text().trim();
        var Descripcion = $(this).find('td:eq(1)').text().trim();
        
        $('#id-condicion').val(ID_condicion);
        $('#descripcion').val(Descripcion);
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

        // Obtener la descripción ingresada
        const descripcion = $('#descripcion').val().trim();
        let isDuplicate = false;

        // Recorrer las filas de la tabla para verificar duplicados
        $('#tabla-cuerpo tr').each(function() {
            const descripcionExistente = $(this).find('td').eq(1).text().trim(); // La columna Descripción es la segunda, por eso usamos `eq(1)`

            // Comprobar si la descripción coincide con un registro existente
            if (descripcion.toLowerCase() === descripcionExistente.toLowerCase()) { // Ignora mayúsculas/minúsculas
                isDuplicate = true;
                return false; // Detener el bucle
            }
        });

        // Si se encontró un duplicado, mostrar una alerta y detener la ejecución
        if (isDuplicate) {
            alert("Esta condición ya existe. Por favor, ingrese una descripción diferente.");
            return;
        }

        if($('#descripcion').val() === ""){
            alert("Favor de introducir descripcion de la condicion");
            return;
        }

        if ($("#id-condicion").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-condicion").val();
        }
        $.ajax({
            url: "https://localhost:7131/Condiciones/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_condicion": ID,
                "descripcion": $("#descripcion").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerCondiciones()
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
            url: "https://localhost:7131/Condiciones/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_condicion": $("#id-condicion").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerCondiciones();
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
    $('#descripcion').attr('disabled', false);
}


function traerCondiciones() {
    $('#tabla-cuerpo').empty(); 
    $.ajax({
        url: "https://localhost:7131/Condiciones/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.condicion)
        result.result.condicion.forEach(function(condicion) {
            var ID_autor = condicion.iD_condicion;
            var Descripcion = condicion.descripcion;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_autor}</td>
                    <td>${Descripcion}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer las condiciones: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}