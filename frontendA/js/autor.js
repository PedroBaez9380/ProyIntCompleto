$(document).ready(function() {
    traerAutores();

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_autor = $(this).find('td:eq(0)').text().trim();
        var Nombre = $(this).find('td:eq(1)').text().trim();
        var Apellido = $(this).find('td:eq(2)').text().trim();

        $('#id-autor').val(ID_autor);
        $('#nombre').val(Nombre);
        $('#apellido').val(Apellido);
        deshabilitarCampos();
    });

    $('#boton-nuevo').click(function() {
        habilitarCampos();
        limpiarCampos();
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);

        // Asigna la validación de solo letras a los campos cuando se habiliten
        $('#nombre').on('input', function() {
            validarSoloLetras(this);
        });
        $('#apellido').on('input', function() {
            validarSoloLetras(this);
        });
    });

    $('#boton-modificacion').click(function() {
        habilitarCampos();
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);

        // Asigna la validación de solo letras a los campos cuando se habiliten
        $('#nombre').on('input', function() {
            validarSoloLetras(this);
        });
        $('#apellido').on('input', function() {
            validarSoloLetras(this);
        });
    });

    $('#boton-guardar').click(function() {
        // Validación: verificar si los campos están vacíos
        if ($("#nombre").val().trim() === "" || $("#apellido").val().trim() === "") {
            alert("Debe llenar todos los apartados para poder guardar.");
            return; // Detener la ejecución si los campos no están completos
        }

        const nombre = $("#nombre").val().trim();
        const apellido = $("#apellido").val().trim();
        let isDuplicate = false;

        // Recorrer las filas de la tabla para verificar duplicados
        $('#tabla-cuerpo tr').each(function() {
            const nombreExistente = $(this).find('td').eq(1).text().trim();
            const apellidoExistente = $(this).find('td').eq(2).text().trim();

            // Comprobar si el nombre y apellido coinciden con un registro existente
            if (nombre === nombreExistente && apellido === apellidoExistente) {
                isDuplicate = true;
                return false; // Detener el bucle
            }
        });

        // Si se encontró un duplicado, mostrar una alerta y detener la ejecución
        if (isDuplicate) {
            alert("Este autor ya existe. Por favor, ingrese un autor diferente.");
            return;
        }

        if ($("#id-autor").val() === "" ){
            option = "Guardar";
            typemod = 'POST';
            ID = null;
        } else {
            option = "Actualizar";
            typemod = 'PUT';
            ID = $("#id-autor").val();
        }

        $.ajax({
            url: "https://localhost:7131/Autores/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_autor": ID,
                "nombre": $("#nombre").val(),
                "apellido": $("#apellido").val(),
            }),
            crossDomain: true
        }).done(function (result) {
            console.log(result);
            limpiarCampos();
            deshabilitarCampos();
            traerAutores();
            alert("Guardado exitoso!");

        }).fail(function (xhr, status, error) {
            alert("Hubo un problema al guardar: " + error + "\nStatus: " + status);
            console.error(xhr);
        });
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
    });

    $('#boton-borrar').click(function() {
        $.ajax({
            url: "https://localhost:7131/Autores/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_autor": $("#id-autor").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerAutores();
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

// Función para validar solo letras y limitar a 30 caracteres
function validarSoloLetras(campo) {
    var valorCampo = campo.value;
    // Limitar a 30 caracteres
    if (valorCampo.length > 30) {
        campo.value = valorCampo.substring(0, 30);
        alert('El máximo permitido es de 30 caracteres.');
    }
    // Expresión regular que permite solo letras y espacios
    if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(valorCampo)) {
        // Reemplaza los caracteres que no sean letras
        campo.value = valorCampo.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        alert('Solo se permiten letras. No se permiten números.');
    }
}

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
    $('#apellido').attr('disabled', false);
}

function traerAutores() {
    $('#tabla-cuerpo').empty(); 
    $.ajax({
        url: "https://localhost:7131/Autores/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.autores);
        result.result.autores.forEach(function(autor) {
            var ID_autor = autor.iD_autor;
            var Nombre = autor.nombre;
            var Apellido = autor.apellido;
            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_autor}</td>
                    <td>${Nombre}</td>
                    <td>${Apellido}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los autores: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}