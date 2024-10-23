using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Autores")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AutorController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarAutores()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tAutores = DBDatos.Listar("GestionAutor", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var AutoresList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tAutores.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tAutores.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                AutoresList.Add(dict);
            }

            string jsonAutores = JsonSerializer.Serialize(AutoresList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Autores = JsonSerializer.Deserialize<List<Autor>>(jsonAutores)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarAutor(Autor Autor)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre", Autor.Nombre),
                new Parametro("@Apellido", Autor.Apellido),
            };

            dynamic result = DBDatos.Ejecutar("GestionAutor", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarAutor(Autor Autor)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_autor", Autor.ID_autor.ToString()),
            new Parametro("@Nombre", Autor.Nombre),
            new Parametro("@Apellido", Autor.Apellido),
        };

            dynamic result = DBDatos.Ejecutar("GestionAutor", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarAutor(Autor Autor)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_autor", Autor.ID_autor.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionAutor", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

