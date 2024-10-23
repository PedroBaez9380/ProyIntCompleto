using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Generos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GeneroController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarGeneros()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tGeneros = DBDatos.Listar("GestionGenero", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var GenerosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tGeneros.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tGeneros.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                GenerosList.Add(dict);
            }

            string jsonGeneros = JsonSerializer.Serialize(GenerosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Generos = JsonSerializer.Deserialize<List<Genero>>(jsonGeneros)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarGenero(Genero Genero)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre", Genero.Nombre),
            };

            dynamic result = DBDatos.Ejecutar("GestionGenero", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarGenero(Genero Genero)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_genero", Genero.ID_genero.ToString()),
            new Parametro("@Nombre", Genero.Nombre.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionGenero", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarGenero(Genero Genero)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_genero", Genero.ID_genero.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionGenero", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

