using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Libros")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LibroController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarLibros()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tLibros = DBDatos.Listar("GestionLibro", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var LibrosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tLibros.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tLibros.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                LibrosList.Add(dict);
            }

            string jsonLibros = JsonSerializer.Serialize(LibrosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Libros = JsonSerializer.Deserialize<List<Libro>>(jsonLibros)
                }
            };
        }
        [HttpGet]
        [Route("TraerUno/{ID_libro}")]
        public dynamic listarLibro(int ID_libro)
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECTONE"),
                    new Parametro("@ID_libro", ID_libro.ToString()),
                };

            DataTable tLibros = DBDatos.Listar("GestionLibro", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var LibrosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tLibros.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tLibros.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                LibrosList.Add(dict);
            }

            string jsonLibros = JsonSerializer.Serialize(LibrosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Libros = JsonSerializer.Deserialize<List<Libro>>(jsonLibros)
                }
            };
        }

        [HttpGet]
        [Route("TraerUltimoLibro")]
        public dynamic listarUltimoLibro()
        {
            //List<Parametro> parametros = new List<Parametro>
            //    {
            //        new Parametro("@Operacion", "SELECTONE"),
            //        new Parametro("@ID_libro", ID_libro.ToString()),
            //    };

            DataTable tLibros = DBDatos.Listar("ObtenerUltimoLibro");

            // Funcion para convertir la DataTable a una lista de diccionarios
            var LibroList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tLibros.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tLibros.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                LibroList.Add(dict);
            }

            string jsonUltimoLibro = JsonSerializer.Serialize(LibroList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Libros = JsonSerializer.Deserialize<List<Libro>>(jsonUltimoLibro)
                }
            };
        }

        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarLibro(Libro Libro)
        {
            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Titulo", Libro.Titulo),
                new Parametro("@Numero_ISBN", Libro.Numero_ISBN),
                new Parametro("@ID_editorial", Libro.ID_editorial.ToString()),
                new Parametro("@Year_publicacion", Libro.Year_publicacion),
                new Parametro("@N_paginas", Libro.N_paginas.ToString()),
                new Parametro("@Tipo_pasta", Libro.Tipo_pasta),
                new Parametro("@ID_ubicacion", Libro.ID_ubicacion.ToString()),
                new Parametro("@ID_idioma", Libro.ID_idioma.ToString()),
                new Parametro("@ID_condicion", Libro.ID_condicion.ToString())
            };

            dynamic result = DBDatos.Ejecutar("GestionLibro", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarLibro(Libro Libro)
        {
            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "UPDATE"),
                new Parametro("@ID_libro", Libro.ID_libro.ToString()),
                new Parametro("@Titulo", Libro.Titulo),
                new Parametro("@Numero_ISBN", Libro.Numero_ISBN),
                new Parametro("@ID_editorial", Libro.ID_editorial.ToString()),
                new Parametro("@Year_publicacion", Libro.Year_publicacion),
                new Parametro("@N_paginas", Libro.N_paginas.ToString()),
                new Parametro("@Tipo_pasta", Libro.Tipo_pasta),
                new Parametro("@ID_ubicacion", Libro.ID_ubicacion.ToString()),
                new Parametro("@ID_idioma", Libro.ID_idioma.ToString()),
                new Parametro("@ID_condicion", Libro.ID_condicion.ToString())
            };

            dynamic result = DBDatos.Ejecutar("GestionLibro", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarLibro(Libro Libro)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_libro", Libro.ID_libro.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionLibro", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

