using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("GeneroLibros")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GeneroLibroController : ControllerBase
    {


        [HttpGet]
        [Route("Traer/{ID_libro}")]
        public dynamic listarGeneroLibro(int ID_libro)
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                    new Parametro("@ID_libro", ID_libro.ToString()),
                }; 

            DataTable tGeneroLibros = DBDatos.Listar("GestionGeneroLibro", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var GeneroLibrosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tGeneroLibros.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tGeneroLibros.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                GeneroLibrosList.Add(dict);
            }

            string jsonGeneroLibro = JsonSerializer.Serialize(GeneroLibrosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    GeneroLibro = JsonSerializer.Deserialize<List<GeneroLibro>>(jsonGeneroLibro)
                }
            };
        }

        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarGeneroLibro(GeneroLibro GeneroLibro)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@ID_libro", GeneroLibro.ID_libro.ToString()),
                new Parametro("@ID_genero", GeneroLibro.ID_genero.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionGeneroLibro", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarGeneroLibro(GeneroLibro GeneroLibro)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_libro", GeneroLibro.ID_libro.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionGeneroLibro", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

