$(document).ready(function() {
    traerPaises()
    traerCargos()
    traerEmpleados()

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
                
        $('#id-empleado').val($(this).find('td:eq(0)').text().trim());
        $('#nombre').val($(this).find('td:eq(1)').attr('data-id'));
        $('#apellido').val($(this).find('td:eq(1)').text().trim());
        $('#pais').val($(this).find('td:eq(0)').attr('data-id-pais'));
        $('#estado').val($(this).find('td:eq(0)').attr('data-id-estado'));
        $('#municipio').val($(this).find('td:eq(0)').attr('data-id-municipio'));
        $('#calle').val($(this).find('td:eq(2)').text().trim());
        $('#correo').val($(this).find('td:eq(3)').text().trim());
        $('#telefono').val($(this).find('td:eq(4)').text().trim());
        $('#fecha-contratacion').val($(this).find('td:eq(5)').text().trim());
        $('#fecha-nacimiento').val($(this).find('td:eq(6)').text().trim());
        $('#cargo').val($(this).find('td:eq(7)').attr('data-id'));
        $('#estado-empleado').val($(this).find('td:eq(8)').attr('data-id'));
        $('#contrasena').val($(this).find('td:eq(0)').attr('data-contrasena'));
        
        deshabilitarCampos();
    });

    $('#boton-nuevo').click(function() {
        habilitarCampos()
        limpiarCampos() 
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', true);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
        $('#estado-empleado').attr('disabled', true);
    });

    $('#boton-modificacion').click(function() {
        habilitarCampos()
        $('#boton-guardar').attr('disabled', false);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', true);
        $('#boton-borrar').attr('disabled', true);
    });

    $('#boton-guardar').click(function() {
        if ($("#id-empleado").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;
        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-empleado").val();
        }
        $.ajax({
            url: "https://localhost:7131/Empleados/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_empleado": ID,
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
                "estado_empleado": $('#estado-empleado').val() == "1" ? true : false,
                "clave": $('#contrasena').val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    console.log(response.message);
                    limpiarCampos()
                    deshabilitarCampos()
                    traerEmpleados()
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

    $('#buscarEmpleado').on('input', function() {
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
    $('#estado-empleado').attr('disabled', false);
    $('#calle').attr('disabled', false);
    $('#contrasena').attr('disabled', false);
}

function traerEmpleados() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Empleados/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.empleados)
        result.result.empleados.forEach(function(empleado) {
            var ID_empleado = empleado.iD_empleado;
            var nombre = empleado.nombre;
            var apellido = empleado.apellido;
            var ID_pais = empleado.iD_pais;
            var nombre_pais = empleado.nombre_pais;
            var ID_estado = empleado.iD_estado;
            var nombre_estado = empleado.nombre_estado;
            var ID_municipio = empleado.iD_municipio;
            var nombre_municipio = empleado.nombre_municipio;
            var calle = empleado.calle;
            var correo = empleado.correo;
            var numero_telefono = empleado.numero_telefono;
            var fecha_contratacion = empleado.fecha_contratacion.substring(0, 10);
            var fecha_nacimiento = empleado.fecha_nacimiento.substring(0, 10);
            var ID_cargo = empleado.iD_cargo;
            var descripcion_cargo = empleado.descripcion_cargo;
            var clave = empleado.clave

            if (empleado.estado_empleado) {
                var estado_empleado = '1'
                var descripcion_estado = 'Activo'
            } else {
                var estado_empleado = '0'
                var descripcion_estado = 'Inactivo'
            }


            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td data-id-pais="${ID_pais}" data-id-estado="${ID_estado}" data-id-municipio="${ID_municipio}" data-contrasena="${clave}">${ID_empleado}</td>
                    <td data-id="${nombre}">${apellido}</td>
                    <td>${calle}</td>
                    <td>${correo}</td>
                    <td>${numero_telefono}</td>
                    <td>${fecha_contratacion}</td>
                    <td>${fecha_nacimiento}</td>
                    <td data-id="${ID_cargo}">${descripcion_cargo}</td>
                    <td data-id="${estado_empleado}">${descripcion_estado}</td>

                    
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los empleados: " + error + "\nStatus: " + status);
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

// function traerMunicipios() {
//     $.ajax({
//         url: "https://localhost:7131/Municipios/Traer",
//         type: 'GET',
//         dataType: 'json',
//         crossDomain: true
//     }).done(function (result) {
//         console.log(result.result.municipio)
//         result.result.municipio.forEach(function(municipio) {
//             var ID_municipio = municipio.iD_municipio;
//             var Nombre = municipio.nombre_municipio;
            
//             $('#municipio').append(`
//                 <option value="${ID_municipio}">${Nombre}</option>
//             `);    
//         });
//     }).fail(function (xhr, status, error) {
//         alert("Hubo un problema al traer los municipios: " + error + "\nStatus: " + status);
//         console.error(xhr);
//     });
// }

function traerCargos() {
    $.ajax({
        url: "https://localhost:7131/Cargos/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        console.log(result.result.cargo)
        result.result.cargo.forEach(function(cargo) {
            var ID_cargo = cargo.iD_cargo;
            var descripcion = cargo.descripcion;
            
            $('#cargo').append(`
                <option value="${ID_cargo}">${descripcion}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los cargos: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

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

function validarTelefono(telefono) {
    const regexTelefono = /^[0-9]+$/; // Permite solo dígitos del 0 al 9

    if (!regexTelefono.test(telefono)) {
        return "El número de teléfono solo debe contener números.";
    }
    return "Número de teléfono válido.";
}
