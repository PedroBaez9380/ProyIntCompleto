document.addEventListener('DOMContentLoaded', function() {
    var botonDesplegable = document.querySelector('#boton-multas-catalogo button');
    var contenedorMenu = document.querySelector('#boton-multas-catalogo .menu-desplegable');

    botonDesplegable.addEventListener('click', function() {
        contenedorMenu.classList.toggle('active');
    });
    //
    var botonDesplegableCatalogoLibro = document.querySelector('#boton-catalogos-libros button');
    var contenedorMenuCatalogoLibro = document.querySelector('#boton-catalogos-libros .menu-desplegable');

    botonDesplegableCatalogoLibro.addEventListener('click', function() {
        contenedorMenuCatalogoLibro.classList.toggle('active');
    });
    //
    var botonDesplegableCatalogoEmpleado = document.querySelector('#boton-empleados-catalogo button');
    var contenedorMenuCatalogoEmpleado = document.querySelector('#boton-empleados-catalogo .menu-desplegable');

    botonDesplegableCatalogoEmpleado.addEventListener('click', function() {
        contenedorMenuCatalogoEmpleado.classList.toggle('active');
    });
    //
    var botonDesplegableInformacion = document.querySelector('#boton-informacion button');
    var contenedorMenuInformacion = document.querySelector('#boton-informacion #menu-desplegable-info');

    botonDesplegableInformacion.addEventListener('click', function() {
        contenedorMenuInformacion.classList.toggle('active');
        console.log('se clickeo')
    });
});


