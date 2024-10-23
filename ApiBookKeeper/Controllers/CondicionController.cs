using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Condiciones")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CondicionController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarCondiciones()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tCondiciones = DBDatos.Listar("GestionCondicion", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var CondicionesList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tCondiciones.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tCondiciones.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                CondicionesList.Add(dict);
            }

            string jsonCondicion = JsonSerializer.Serialize(CondicionesList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Condicion = JsonSerializer.Deserialize<List<Condicion>>(jsonCondicion)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarCondicion(Condicion Condicion)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Descripcion", Condicion.Descripcion),
            };

            dynamic result = DBDatos.Ejecutar("GestionCondicion", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarCondicion(Condicion Condicion)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_condicion", Condicion.ID_condicion.ToString()),
            new Parametro("@Descripcion", Condicion.Descripcion.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionCondicion", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarCondicion(Condicion Condicion)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_condicion", Condicion.ID_condicion.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionCondicion", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

