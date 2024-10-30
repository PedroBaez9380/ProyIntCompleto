$(document).ready(function() {
    $('#boton-entrar').click(function(event) {
        event.preventDefault();

        if ($('#usuario').val().trim() === ""  || $('#contrasena').val().trim() === ""){
            alert("Favor de ingresar usuario y contraseña")
            return;
        }

        var ID_usuario = $('#usuario').val(); 

        $.ajax({
            url: "https://localhost:7131/Login/Traer/" + ID_usuario,
            type: 'GET',
            dataType: 'json',
            crossDomain: true
        }).done(function (result) {
            // Verificar si la solicitud fue exitosa y si el empleado existe
            if (!result.success) {
                alert("Usuario o contraseña incorrectos");
                // alert(result.message);
            } else {
                // Procesar la lista de empleados
                result.result.empleado.forEach(function(empleado) {
                    var clave = empleado.clave;
                    var ID_rol = empleado.iD_rol;
                    var estado_empleado = empleado.estado_empleado;
                    comprobar_datos(clave, ID_rol, estado_empleado);
                });
            }
        }).fail(function (xhr, status, error) {
            alert("Hubo un problema al verificar el usuario: " + error + "\nStatus: " + status);
            console.error(xhr);
        });
        
    });
});

function comprobar_datos(clave, ID_rol, estado_empleado){
    if(estado_empleado){
        if(clave == $('#contrasena').val()){
            if(ID_rol == 1){
                window.location.href = "frontendA/html/gesiton-empleados.html";
                alert("Es admin");
            } else if(ID_rol == 2){
                window.location.href = "frontendU/html/renta-libros.html";
                alert("Es usuario");
            } else {
                alert("Hubo un error al validar el rol");
            }
        } else{
            alert("Usuario o contraseña incorrectos");
        }
    } else {
        alert("El usuario se encuentra inactivo");
    }
    
}


