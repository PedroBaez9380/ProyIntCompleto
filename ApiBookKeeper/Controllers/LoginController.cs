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

            // Ejecutar el procedimiento y verificar si tEmpleado es nulo
            DataTable tEmpleado = DBDatos.Listar("Login", parametros);

            // Si tEmpleado es nulo, retornar mensaje de error
            if (tEmpleado == null)
            {
                return new
                {
                    success = false,
                    message = "Usuario o contraseña incorretos",
                    result = (object)null
                };
            }

            // Si no se encontraron filas, retornar mensaje de que el empleado no existe
            if (tEmpleado.Rows.Count == 0 || tEmpleado.Rows[0]["Clave"] == DBNull.Value)
            {
                return new
                {
                    success = false,
                    message = "El empleado no existe",
                    result = (object)null
                };
            }

            // Convertir DataTable a lista de diccionarios
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

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Empleado = EmpleadoList
                }
            };
        }



    }
}

