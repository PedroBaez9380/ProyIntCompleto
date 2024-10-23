using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Municipios")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MunicipioController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarMunicipio()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tMunicipios = DBDatos.Listar("GestionMunicipio", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var MunicipiosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tMunicipios.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tMunicipios.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                MunicipiosList.Add(dict);
            }

            string jsonMunicipio = JsonSerializer.Serialize(MunicipiosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Municipio = JsonSerializer.Deserialize<List<Municipio>>(jsonMunicipio)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarMunicipio(Municipio Municipio)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre_municipio", Municipio.Nombre_municipio),
                new Parametro("@ID_estado", Municipio.ID_estado.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionMunicipio", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarMunicipio(Municipio Municipio)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_municipio", Municipio.ID_municipio.ToString()),
            new Parametro("@Nombre_municipio", Municipio.Nombre_municipio),
            new Parametro("@ID_estado", Municipio.ID_estado.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionMunicipio", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarMunicipio(Municipio Municipio)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_municipio", Municipio.ID_municipio.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionMunicipio", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

