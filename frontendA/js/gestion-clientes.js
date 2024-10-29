$(document).ready(function() {
    traerPaises()
    traerClientes()

    $('#pais').change(function() {
        // Obtiene el valor seleccionado
        var IDPaisSelected = $(this).find(":selected").val();
        traerEstados(IDPaisSelected)
    });

    $('#estado').change(function() {
        // Obtiene el valor seleccionado
        var IDEstadoSelected = $(this).find(":selected").val();
        traerMunicipios(IDEstadoSelected)
    });

    $('#tabla-cuerpo').on('click', 'tr', function() {
        
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        var ID_estado = $(this).find('td:eq(0)').text().trim();
        var Nombre = $(this).find('td:eq(2)').text().trim();
                
        $('#id-cliente').val($(this).find('td:eq(0)').text().trim());
        $('#nombre').val($(this).find('td:eq(1)').attr('data-id'));
        $('#apellido').val($(this).find('td:eq(1)').text().trim());
        $('#pais').val($(this).find('td:eq(0)').attr('data-id-pais'));
        $('#estado').val($(this).find('td:eq(0)').attr('data-id-estado'));
        $('#municipio').val($(this).find('td:eq(0)').attr('data-id-municipio'));
        $('#calle').val($(this).find('td:eq(2)').text().trim());
        $('#correo').val($(this).find('td:eq(3)').text().trim());
        $('#telefono').val($(this).find('td:eq(4)').text().trim());
        $('#fecha-registro').val($(this).find('td:eq(5)').text().trim());
        $('#fecha-nacimiento').val($(this).find('td:eq(6)').text().trim());
        $('#estado-renta').val($(this).find('td:eq(7)').attr('data-id'));


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

        if ($("#id-cliente").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        }else{
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-cliente").val();
        }
        $.ajax({
            url: "https://localhost:7131/Clientes/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_cliente": ID,
                "nombre": $('#nombre').val(),
                "apellido": $('#apellido').val(),
                "iD_pais": $('#pais').val(),
                "iD_estado": $('#estado').val(),
                "iD_municipio": $('#municipio').val(),
                "calle": $('#calle').val(),
                "correo": $('#correo').val(),
                "numero_telefono": $('#telefono').val(),
                "fecha_contratacion": $('#fecha-contratacion').val(),
                "fecha_nacimiento": $('#fecha-nacimiento').val(),
                "iD_cargo": $('#cargo').val(),
                "estado_renta": $('#estado-renta').val() == "1" ? true : false
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerClientes()
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

});

function limpiarCampos(){
    $('.fila-campos div textarea').val('');
    $('.fila-campos div select').val('default');
    $('#fecha-nacimiento').val('');
}

function deshabilitarCampos(){
    $('.fila-campos div textarea').attr('disabled', true);
    $('.fila-campos div select').attr('disabled', true);
    $('#fecha-nacimiento').attr('disabled', true);
}

function habilitarCampos() {
    $('#nombre').attr('disabled', false);
    $('#apellido').attr('disabled', false);
    $('#pais').attr('disabled', false);
    // $('#estado').attr('disabled', false);
    // $('#municipio').attr('disabled', false);
    $('#correo').attr('disabled', false);
    $('#telefono').attr('disabled', false);
    // $('#fecha-contratacion').attr('disabled', false);
    $('#fecha-nacimiento').attr('disabled', false);
    $('#cargo').attr('disabled', false);
    $('#estado-renta').attr('disabled', false);
    $('#calle').attr('disabled', false);
}

function traerClientes() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Clientes/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.cliente)
        result.result.cliente.forEach(function(cliente) {
            var ID_cliente = cliente.iD_cliente;
            var nombre = cliente.nombre;
            var apellido = cliente.apellido;
            var ID_pais = cliente.iD_pais;
            var nombre_pais = cliente.nombre_pais;
            var ID_estado = cliente.iD_estado;
            var nombre_estado = cliente.nombre_estado;
            var ID_municipio = cliente.iD_municipio;
            var nombre_municipio = cliente.nombre_municipio;
            var calle = cliente.calle;
            var correo = cliente.correo;
            var numero_telefono = cliente.numero_telefono;
            var fecha_registro = cliente.fecha_registro.substring(0, 10);
            var fecha_nacimiento = cliente.fecha_nacimiento.substring(0, 10);

            if (cliente.estado_renta) {
                var estado_renta = '1'
                var descripcion_estado = 'Permitido'
            } else {
                var estado_renta = '0'
                var descripcion_estado = 'Denegado'
            }


            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td data-id-pais="${ID_pais}" data-id-estado="${ID_estado}" data-id-municipio="${ID_municipio}">${ID_cliente}</td>
                    <td data-id="${nombre}">${apellido}</td>
                    <td>${calle}</td>
                    <td>${correo}</td>
                    <td>${numero_telefono}</td>
                    <td>${fecha_registro}</td>
                    <td>${fecha_nacimiento}</td>
                    <td data-id="${estado_renta}">${descripcion_estado}</td>

                    
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los clientes: " + error + "\nStatus: " + status);
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
            
            $('#pais').append(`
                <option value="${ID_pais}">${Nombre}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los paises: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

// function traerEstados() {
//     $.ajax({
//         url: "https://localhost:7131/Estados/Traer",
//         type: 'GET',
//         dataType: 'json',
//         crossDomain: true
//     }).done(function (result) {
//         console.log(result.result.estado)
//         result.result.estado.forEach(function(estado) {
//             var ID_estado = estado.iD_estado;
//             var Nombre = estado.nombre_estado;
            
//             $('#estado').append(`
//                 <option value="${ID_estado}">${Nombre}</option>
//             `);    
//         });
//     }).fail(function (xhr, status, error) {
//         alert("Hubo un problema al traer los estados: " + error + "\nStatus: " + status);
//         console.error(xhr);
//     });
// }

function traerEstados(IDPaisSelected) {
    $('#estado').empty();
    $('#estado').append(`
        <option selected">Seleccionar</option>
    `); 
    $('#municipio').empty();
    $('#municipio').append(`
        <option selected">Seleccionar</option>
    `); 
    $('#municipio').attr('disabled', true);
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
            
            if(IDPaisSelected == ID_pais){
                $('#estado').append(`
                    <option value="${ID_estado}">${Nombre}</option>
                `);      
            }
        });
        $('#estado').attr('disabled', false);
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los municipios: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerMunicipios(IDEstadoSelected) {
    $('#municipio').empty();
    $('#municipio').append(`
        <option selected">Seleccionar</option>
    `); 
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
            
            if(IDEstadoSelected == ID_estado){
                $('#municipio').append(`
                    <option value="${ID_municipio}">${Nombre}</option>
                `);      
            }
        });
        $('#municipio').attr('disabled', false);
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los municipios: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function validarFechaNacimiento(fecha_nacimiento) {
    // Obtener la fecha actual
    const hoy = new Date();
    const fechaActual = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Verificar que la fecha de nacimiento no sea la fecha actual
    if (fecha_nacimiento === fechaActual) {
        return "La fecha de nacimiento no puede ser la fecha actual.";
    }

     $('#descripcion').on('input', function () {
        
        var value = $(this).val();

        value = value.replace(/[^A-Za-z!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]/g, '');

        
    });

    // Si pasa todas las validaciones, es válida
    return "Fecha de nacimiento válida.";
}
function validarCorreo(correo) {
    if (!correo.includes("@")) {
        return "El correo electrónico debe contener el símbolo '@'.";
    }
    return "Correo electrónico válido.";
}

const correo = "example.com"; // Correo a validar
const resultado = validarCorreo(correo);

console.log(resultado); 

function validarTelefono(numero_telefono) {
    const regexTelefono = /^[0-9]+$/; // Permite solo dígitos del 0 al 9

    if (!regexTelefono.test(telefono)) {
        return "El número de teléfono solo debe contener números.";
    }
    else "Número de teléfono válido.";
        this.value = this.value.replace(/[^0-9]/g, '');  // Reemplaza cualquier carácter no numérico con nada
   
}

$('#boton-guardar').click(function() {
        // Validación: verificar si los campos están vacíos
        if ($("#nombre").val().trim() === "" || $("#apellido").val().trim() === "") {
            alert("Debe llenar todos los apartados para poder guardar.");
            return; // Detener la ejecución si los campos no están completos
        }

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

    $('#nombre').on('input', function() {
            validarSoloLetras(this);
        });
        $('#apellido').on('input', function() {
            validarSoloLetras(this);
        });
    });
