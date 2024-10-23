$(document).ready(function() {
    traerLibros()
    traerEditoriales()
    traerUbicaciones()
    traerIdiomas()
    traerCondiciones()
    traerGeneros()
    traerAutores()

    $('#tabla-cuerpo').on('click', 'tr', function() {
        limpiarCampos()
        $('#boton-guardar').attr('disabled', true);
        $('#boton-nuevo').attr('disabled', false);
        $('#boton-modificacion').attr('disabled', false);
        $('#boton-borrar').attr('disabled', false);

        ID_libro = $(this).find('td:eq(0)').text().trim()
        $('#id-libro').val(ID_libro);
        $('#titulo-libro').val($(this).find('td:eq(1)').text().trim());
        $('#n-ISBN').val($(this).find('td:eq(2)').text().trim());
        $('#editorial-libro').val($(this).find('td:eq(3)').attr('data-id'));
        $('#ano-publicacion').val($(this).find('td:eq(4)').text().trim());
        $('#n-paginas').val($(this).find('td:eq(5)').text().trim());
        $('#tipo-pasta').val($(this).find('td:eq(6)').text().trim());
        $('#ubicacion-libro').val($(this).find('td:eq(7)').attr('data-id'));
        $('#idioma-libro').val($(this).find('td:eq(8)').attr('data-id'));
        $('#condicion-libro').val($(this).find('td:eq(9)').attr('data-id'));
        traerAutoresLibro(ID_libro)
        traerGenerosLibro(ID_libro)

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
        
        /* Comienzo de validaciones*/
        if($('#titulo-libro').val() === ""){
            alert("Favor de introducir el titulo del libro");
            return;
        }
        if($('#n-ISBN').val() === ""){
            alert("Favor de introducir el numero ISBN");
            return;
        }

        var isbnRegex = /^(?:\d{1,5}-\d{1,7}-\d{1,7}-[\dX]|\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1,7})$/;
        if (!isbnRegex.test($('#n-ISBN').val())) {
            alert("El número ISBN debe tener el formato adecuado y contener 10 o 13 dígitos (puede incluir guiones)");
            return;
        }

        if($('#editorial-libro').val() === "0"){
            alert("Favor de seleccionar la Editorial");
            return;
        }

        var anoPublicacion = parseInt($('#ano-publicacion').val(), 10);
        if (isNaN(anoPublicacion) || anoPublicacion < 1500 || anoPublicacion > 3000) {
            alert("Favor de introducir un año de publicación válido (entre 1500 y 3000).");
            return;
        }

        var npaginas = parseInt($('#n-paginas').val(), 10);
        if (isNaN(npaginas) || npaginas > 10000 || npaginas < 0) {
            alert("Favor de introducir un numero de paginas valido.");
            return;
        }

        if($('#tipo-pasta').val() === "0"){
            alert("Favor de seleccionar un tipo de pasta");
            return;
        }

        if($('#ubicacion-libro').val() === "0"){
            alert("Favor de seleccionar una ubicacion");
            return;
        }

        if($('#idioma-libro').val() === "0"){
            alert("Favor de seleccionar un idioma");
            return;
        }

        if($('#condicion-libro').val() === "0"){
            alert("Favor de seleccionar una condicion");
            return;
        }
        /* Fin de validaciones */

        if ($("#id-libro").val() === "" ){
            option = "Guardar"
            typemod = 'POST'
            ID = null;

        } else {
            option = "Actualizar"
            typemod = 'PUT'
            ID = $("#id-libro").val();
        }
        $.ajax({
            url: "https://localhost:7131/Libros/"+ option,
            type: typemod,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_libro": ID,
                "titulo": $("#titulo-libro").val(),
                "numero_ISBN": $('#n-ISBN').val(),
                "iD_editorial": $('#editorial-libro').val(),
                "year_publicacion": $('#ano-publicacion').val(),
                "n_paginas": $('#n-paginas').val(),
                "tipo_pasta": $('#tipo-pasta').val(), //Se mandaria el N?
                "iD_ubicacion": $('#ubicacion-libro').val(),
                "iD_idioma": $('#idioma-libro').val(),
                "iD_condicion": $('#condicion-libro').val(),
                }),
            crossDomain: true,
            success: function(response) {
                var ID_libro
                if (response.success === "True") {
                    if(option == "Guardar") {
                        $.ajax({
                            url: "https://localhost:7131/Libros/TraerUltimoLibro",
                            type: 'GET',
                            dataType: 'json',
                            crossDomain: true,
                            success: function(response) {
                                console.log(response.result.libros);
                                response.result.libros.forEach(function(libro) {
                                    ID_libro = libro.iD_libro;
                                });
                                BorrarAutoresGeneros(ID_libro)
                                GuardarAutoresGeneros(ID_libro)
                                limpiarCampos()
                                deshabilitarCampos()
                                traerLibros()
                                alert("Guardado exitoso!");
                                $('#boton-guardar').attr('disabled', true);
                                $('#boton-nuevo').attr('disabled', false);
                                $('#boton-modificacion').attr('disabled', true);
                                $('#boton-borrar').attr('disabled', true);
                            },
                            error: function(xhr, status, error) {
                                console.error("Error al obtener los libros:", error);
                            }
                        });
                        
                        
                    } else {
                        ID_libro = ID;
                        BorrarAutoresGeneros(ID_libro)

                        setTimeout(function() {
                            GuardarAutoresGeneros(ID_libro);
                            limpiarCampos()
                            deshabilitarCampos()
                            traerLibros()
                            alert("Guardado exitoso!");
                            $('#boton-guardar').attr('disabled', true);
                            $('#boton-nuevo').attr('disabled', false);
                            $('#boton-modificacion').attr('disabled', true);
                            $('#boton-borrar').attr('disabled', true);
                        }, 1000); //Temporizador para que primero lo borre y luego lo guarde
                        // BorrarAutoresGeneros(ID_libro)
                        // GuardarAutoresGeneros(ID_libro)
                        
                    }
                    
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
        ID_libro = $("#id-libro").val()
        BorrarAutoresGeneros(ID_libro)
        $.ajax({
            url: "https://localhost:7131/Libros/Borrar",
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_libro": $("#id-libro").val(),
            }),
            crossDomain: true,
            success: function(response) {
                if (response.success === "True") {
                    //console.log(response.message);
                    limpiarCampos();
                    deshabilitarCampos();
                    traerLibros();
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
    $('#autores label input').prop('checked', false);
    $('#generos label input').prop('checked', false);

}

function deshabilitarCampos(){
    $('.fila-campos div textarea').attr('disabled', true);
    $('.fila-campos div select').attr('disabled', true);
    $('#autores label input').attr('disabled', true);
    $('#generos label input').attr('disabled', true);
}

function habilitarCampos(){
    $('#titulo-libro').attr('disabled', false);
    $('#n-ISBN').attr('disabled', false);
    $('#editorial-libro').attr('disabled', false);
    $('#ano-publicacion').attr('disabled', false);
    $('#n-paginas').attr('disabled', false);
    $('#tipo-pasta').attr('disabled', false);
    $('#ubicacion-libro').attr('disabled', false);
    $('#idioma-libro').attr('disabled', false);
    $('#condicion-libro').attr('disabled', false);
    $('#autores label input').attr('disabled', false);
    $('#generos label input').attr('disabled', false);
}


function traerLibros() {
    $('#tabla-cuerpo').empty();
    $.ajax({
        url: "https://localhost:7131/Libros/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.libros)
        result.result.libros.forEach(function(libro) {
            var ID_libro = libro.iD_libro;
            var titulo = libro.titulo;
            var numeroISBN = libro.numero_ISBN;
            var ID_editorial = libro.iD_editorial;
            var nombre_editorial = libro.nombre_editorial;
            var year_publicacion = libro.year_publicacion.substring(0, 4);
            var n_paginas = libro.n_paginas;
            var tipo_pasta = libro.tipo_pasta;
            var ID_ubicacion = libro.iD_ubicacion;
            var seccion_ubicacion = libro.seccion_ubicacion;
            var estanteria_ubicacion = libro.estanteria_ubicacion;
            var ID_idioma = libro.iD_idioma;
            var nombre_idioma = libro.nombre_idioma;
            var ID_condicion = libro.iD_condicion;
            var descripcion_condicion = libro.descripcion_condicion;

            
            $('#tabla-cuerpo').append(`
                <tr>
                    <td>${ID_libro}</td>
                    <td>${titulo}</td>
                    <td>${numeroISBN}</td>
                    <td data-id="${ID_editorial}">${nombre_editorial}</td>
                    <td>${year_publicacion}</td>
                    <td>${n_paginas}</td>
                    <td>${tipo_pasta}</td>
                    <td data-id="${ID_ubicacion}" >${seccion_ubicacion}-${estanteria_ubicacion} </td>
                    <td data-id="${ID_idioma}">${nombre_idioma}</td>
                    <td data-id="${ID_condicion}">${descripcion_condicion}</td>
                </tr>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los libros: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerEditoriales() {
    $.ajax({
        url: "https://localhost:7131/Editoriales/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.editorial)
        result.result.editorial.forEach(function(editorial) {
            var ID_editorial = editorial.iD_editorial;
            var Nombre = editorial.nombre;
            
            $('#editorial-libro').append(`
                <option value="${ID_editorial}">${Nombre}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer las editoriales: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerUbicaciones() {
    $.ajax({
        url: "https://localhost:7131/Ubicaciones/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.ubicaciones)
        result.result.ubicaciones.forEach(function(ubicacion) {
            var ID_ubicacion = ubicacion.iD_ubicacion;
            var Ubi = "sec. " + ubicacion.seccion + " est. " + ubicacion.estanteria;
            
            $('#ubicacion-libro').append(`
                <option value="${ID_ubicacion}">${Ubi}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer las ubicaciones: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerIdiomas() {
    $.ajax({
        url: "https://localhost:7131/Idiomas/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.idiomas)
        result.result.idiomas.forEach(function(idioma) {
            var ID_idioma = idioma.iD_idioma;
            var nombre = idioma.nombre;
            
            $('#idioma-libro').append(`
                <option value="${ID_idioma}">${nombre}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los idiomas: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerCondiciones() {
    $.ajax({
        url: "https://localhost:7131/Condiciones/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.condicion)
        result.result.condicion.forEach(function(condicion) {
            var ID_condicion = condicion.iD_condicion;
            var descripcion = condicion.descripcion;
            
            $('#condicion-libro').append(`
                <option value="${ID_condicion}">${descripcion}</option>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer las condiciones: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerGeneros() {
    $.ajax({
        url: "https://localhost:7131/Generos/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.generos)
        result.result.generos.forEach(function(genero) {
            var ID_genero = genero.iD_genero;
            var nombre = genero.nombre;
            
            $('#generos').append(`
                <label><input type="checkbox" value="${ID_genero}" disabled> <span>${nombre}</span></label>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los generos: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerAutores() {
    $.ajax({
        url: "https://localhost:7131/Autores/Traer",
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.autores)
        result.result.autores.forEach(function(autor) {
            var ID_autor = autor.iD_autor;
            var nombre = autor.nombre;
            var apellido = autor.apellido
            
            $('#autores').append(`
                <label><input type="checkbox" value="${ID_autor}" disabled> <span>${nombre + " " + apellido}</span></label>
            `);    
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los generos: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerAutoresLibro(ID_libro) {
    $.ajax({
        url: "https://localhost:7131/AutorLibros/Traer/" + ID_libro,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.autorLibro)
        result.result.autorLibro.forEach(function(autorLibro) {
            var ID_autor = autorLibro.iD_autor;
            $('#autores input[type="checkbox"][value="' + ID_autor + '"]').prop('checked', true);
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los autores del libro: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function traerGenerosLibro(ID_libro) {
    $.ajax({
        url: "https://localhost:7131/GeneroLibros/Traer/" + ID_libro,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        //console.log(result.result.generoLibro)
        result.result.generoLibro.forEach(function(generoLibro) {
            var ID_genero = generoLibro.iD_genero;
            $('#generos input[type="checkbox"][value="' + ID_genero + '"]').prop('checked', true);
        });
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al traer los generos del libro: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}

function BorrarAutoresGeneros(ID_libro) {
    $.ajax({
        url: "https://localhost:7131/AutorLibros/Borrar",
        type: 'DELETE', 
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "iD_libro": ID_libro,
        }),
        crossDomain: true
    }).done(function (result) {
        //console.log("Limpieza de autores exitosa");
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al limpiar autores: " + error + "\nStatus: " + status);
        console.error(xhr);
    });

    $.ajax({
        url: "https://localhost:7131/GeneroLibros/Borrar",
        type: 'DELETE', 
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "iD_libro": ID_libro,
        }),
        crossDomain: true
    }).done(function (result) {
        //onsole.log("Limpieza de generos exitosa");
    }).fail(function (xhr, status, error) {
        alert("Hubo un problema al limpiar generos: " + error + "\nStatus: " + status);
        console.error(xhr);
    });
}


function GuardarAutoresGeneros(ID_libro) {
    
    $('#autores input[type="checkbox"]:checked').each(function () {
        var ID_autor = $(this).val(); 

        // Realizar la llamada AJAX por cada ID_autor
        $.ajax({
            url: "https://localhost:7131/AutorLibros/Guardar",
            type: 'POST', 
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_autor": ID_autor,
                "iD_libro": ID_libro,
            }),
            crossDomain: true
        }).done(function (result) {
            //console.log("Autor guardado: " + ID_autor);
        }).fail(function (xhr, status, error) {
            alert("Hubo un problema al guardar el autor: " + error + "\nStatus: " + status);
            console.error(xhr);
        });
    });

    $('#generos input[type="checkbox"]:checked').each(function () {
        var ID_genero = $(this).val(); 
        $.ajax({
            url: "https://localhost:7131/GeneroLibros/Guardar",
            type: 'POST', 
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "iD_genero": ID_genero,
                "iD_libro": ID_libro,
            }),
            crossDomain: true
        }).done(function (result) {
            //console.log("genero guardado");
        }).fail(function (xhr, status, error) {
            alert("Hubo un problema al guardar el genero: " + error + "\nStatus: " + status);
            console.error(xhr);
        });
    });
}



  