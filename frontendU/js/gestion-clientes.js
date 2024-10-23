$(document).ready(function() {
    traerPaises()
    traerEstados()
    traerMunicipios()
    traerClientes()

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
        } else {
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
}

function deshabilitarCampos(){
    $('.fila-campos div textarea').attr('disabled', true);
    $('.fila-campos div select').attr('disabled', true);
}

function habilitarCampos() {
    $('#nombre').attr('disabled', false);
    $('#apellido').attr('disabled', false);
    $('#pais').attr('disabled', false);
    $('#estado').attr('disabled', false);
    $('#municipio').attr('disabled', false);
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
            
            $('#estado').append(`
                <option value="${ID_estado}">${Nombre}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los estados: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerMunicipios() {
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
            
            $('#municipio').append(`
                <option value="${ID_municipio}">${Nombre}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los municipios: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}
