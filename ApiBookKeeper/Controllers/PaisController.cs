using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Paises")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PaisController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarPaises()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tPaises = DBDatos.Listar("GestionPais", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var PaisesList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tPaises.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tPaises.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                PaisesList.Add(dict);
            }

            string jsonPais = JsonSerializer.Serialize(PaisesList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Paises = JsonSerializer.Deserialize<List<Pais>>(jsonPais)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarPais(Pais Pais)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre_pais", Pais.Nombre_pais),
            };

            dynamic result = DBDatos.Ejecutar("GestionPais", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarPais(Pais Pais)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_pais", Pais.ID_pais.ToString()),
            new Parametro("@Nombre_pais", Pais.Nombre_pais.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionPais", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarPais(Pais Pais)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_pais", Pais.ID_pais.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionPais", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

