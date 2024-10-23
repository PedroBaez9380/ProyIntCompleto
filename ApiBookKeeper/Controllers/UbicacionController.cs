using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Ubicaciones")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UbicacionController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarUbicaciones()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tUbicaciones = DBDatos.Listar("GestionUbicacion", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var UbicacionesList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tUbicaciones.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tUbicaciones.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                UbicacionesList.Add(dict);
            }

            string jsonUbicaciones = JsonSerializer.Serialize(UbicacionesList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Ubicaciones = JsonSerializer.Deserialize<List<Ubicacion>>(jsonUbicaciones)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarUbicacion(Ubicacion Ubicacion)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Seccion", Ubicacion.Seccion),
                new Parametro("@Estanteria", Ubicacion.Estanteria.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionUbicacion", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarUbicacion(Ubicacion Ubicacion)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_ubicacion", Ubicacion.ID_ubicacion.ToString()),
            new Parametro("@Seccion", Ubicacion.Seccion),
            new Parametro("@Estanteria", Ubicacion.Estanteria.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionUbicacion", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarUbicacion(Ubicacion Ubicacion)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_ubicacion", Ubicacion.ID_ubicacion.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionUbicacion", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

