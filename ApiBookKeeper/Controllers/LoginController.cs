using ApiBookKeeper.Models;
using ApiBookKeeper.Recursos;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Text.Json;
using System.Web.Http.Cors;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Login")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ControllerBase
    {


        [HttpGet]
        [Route("Traer/{ID_empleado}")]
        public dynamic listarusuario(int ID_empleado)
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@ID_empleado", ID_empleado.ToString()),
                }; 

            DataTable tEmpleado = DBDatos.Listar("Login", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var EmpleadoList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tEmpleado.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tEmpleado.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                EmpleadoList.Add(dict);
            }

            string jsonUsuario = JsonSerializer.Serialize(EmpleadoList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Empleado = JsonSerializer.Deserialize<List<Login>>(jsonUsuario)
                }
            };
        }

    }
}

