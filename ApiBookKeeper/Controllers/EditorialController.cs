using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Editoriales")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditorialController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarEditoriales()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tEditoriales = DBDatos.Listar("GestionEditorial", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var EditorialesList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tEditoriales.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tEditoriales.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                EditorialesList.Add(dict);
            }

            string jsonEditoriales = JsonSerializer.Serialize(EditorialesList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Editorial = JsonSerializer.Deserialize<List<Editorial>>(jsonEditoriales)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarEditorial(Editorial Editorial)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre", Editorial.Nombre),
            };

            dynamic result = DBDatos.Ejecutar("GestionEditorial", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarEditorial(Editorial Editorial)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_editorial", Editorial.ID_editorial.ToString()),
            new Parametro("@Nombre", Editorial.Nombre.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionEditorial", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarEditorial(Editorial Editorial)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_editorial", Editorial.ID_editorial.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionEditorial", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

