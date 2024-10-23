using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Idiomas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class IdiomaController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarIdiomas()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tIdiomas = DBDatos.Listar("GestionIdioma", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var IdiomasList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tIdiomas.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tIdiomas.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                IdiomasList.Add(dict);
            }

            string jsonIdiomas = JsonSerializer.Serialize(IdiomasList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Idiomas = JsonSerializer.Deserialize<List<Idioma>>(jsonIdiomas)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarIdioma(Idioma Idioma)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre", Idioma.Nombre),
            };

            dynamic result = DBDatos.Ejecutar("GestionIdioma", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarIdioma(Idioma Idioma)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_idioma", Idioma.ID_idioma.ToString()),
            new Parametro("@Nombre", Idioma.Nombre.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionIdioma", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarIdioma(Idioma Idioma)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_idioma", Idioma.ID_idioma.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionIdioma", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

