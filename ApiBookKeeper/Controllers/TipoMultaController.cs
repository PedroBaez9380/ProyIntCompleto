using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("TiposMulta")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TipoMultaController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarTiposMulta()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tTiposMulta = DBDatos.Listar("GestionTipoMulta", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var TiposMultaList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tTiposMulta.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tTiposMulta.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                TiposMultaList.Add(dict);
            }

            string jsonTiposMulta = JsonSerializer.Serialize(TiposMultaList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    TiposMulta = JsonSerializer.Deserialize<List<TipoMulta>>(jsonTiposMulta)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarTipoMulta(TipoMulta TipoMulta)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Descripcion", TipoMulta.Descripcion),
                new Parametro("@Tarifa", TipoMulta.Tarifa.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionTipoMulta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarTipoMulta(TipoMulta TipoMulta)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_tipo_multa", TipoMulta.ID_tipo_multa.ToString()),
            new Parametro("@Descripcion", TipoMulta.Descripcion),
            new Parametro("@Tarifa", TipoMulta.Tarifa.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionTipoMulta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarTipoMulta(TipoMulta TipoMulta)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_tipo_multa", TipoMulta.ID_tipo_multa.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionTipoMulta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

