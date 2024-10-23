using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("AutorLibros")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AutorLibroController : ControllerBase
    {


        [HttpGet]
        [Route("Traer/{ID_libro}")]
        public dynamic listarAutorLibro(int ID_libro)
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                    new Parametro("@ID_libro", ID_libro.ToString()),
                }; 

            DataTable tAutorLibros = DBDatos.Listar("GestionAutorLibro", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var AutorLibrosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tAutorLibros.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tAutorLibros.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                AutorLibrosList.Add(dict);
            }

            string jsonAutorLibro = JsonSerializer.Serialize(AutorLibrosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    AutorLibro = JsonSerializer.Deserialize<List<AutorLibro>>(jsonAutorLibro)
                }
            };
        }

        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarAutorLibro(AutorLibro AutorLibro)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@ID_libro", AutorLibro.ID_libro.ToString()),
                new Parametro("@ID_autor", AutorLibro.ID_autor.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionAutorLibro", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarAutorLibro(AutorLibro AutorLibro)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_libro", AutorLibro.ID_libro.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionAutorLibro", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

