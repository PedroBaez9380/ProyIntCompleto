using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Estados")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EstadoController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarEstado()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tEstados = DBDatos.Listar("GestionEstado", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var EstadosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tEstados.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tEstados.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                EstadosList.Add(dict);
            }

            string jsonEstado = JsonSerializer.Serialize(EstadosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Estado = JsonSerializer.Deserialize<List<Estado>>(jsonEstado)
                }
            };
        }

        //[HttpGet]
        //[Route("TraerEstadosDePais/{ID_pais}")]
        //public dynamic listarLibro(int ID_libro)
        //{
        //    List<Parametro> parametros = new List<Parametro>
        //        {
        //            new Parametro("@Operacion", "SELECTMULTIPLE"),
        //            new Parametro("@ID_libro", ID_libro.ToString()),
        //        };

        //    DataTable tLibros = DBDatos.Listar("GestionLibro", parametros);

        //    // Funcion para convertir la DataTable a una lista de diccionarios
        //    var LibrosList = new List<Dictionary<string, object>>();
        //    foreach (DataRow row in tLibros.Rows)
        //    {
        //        var dict = new Dictionary<string, object>();
        //        foreach (DataColumn col in tLibros.Columns)
        //        {
        //            dict[col.ColumnName] = row[col];
        //        }
        //        LibrosList.Add(dict);
        //    }

        //    string jsonLibros = JsonSerializer.Serialize(LibrosList);

        //    return new
        //    {
        //        success = true,
        //        message = "exito",
        //        result = new
        //        {
        //            Libros = JsonSerializer.Deserialize<List<Libro>>(jsonLibros)
        //        }
        //    };
        //}

        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarEstado(Estado Estado)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre_estado", Estado.Nombre_estado),
                new Parametro("@ID_pais", Estado.ID_pais.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionEstado", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarEstado(Estado Estado)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_estado", Estado.ID_estado.ToString()),
            new Parametro("@Nombre_estado", Estado.Nombre_estado),
            new Parametro("@ID_pais", Estado.ID_pais.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionEstado", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarEstado(Estado Estado)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_estado", Estado.ID_estado.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionEstado", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

