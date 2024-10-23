using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Empleados")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmpleadoController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarEmpleado()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tEmpleados = DBDatos.Listar("GestionEmpleado", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var EmpleadosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tEmpleados.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tEmpleados.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                EmpleadosList.Add(dict);
            }

            string jsonEmpleado = JsonSerializer.Serialize(EmpleadosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Empleados = JsonSerializer.Deserialize<List<Empleado>>(jsonEmpleado)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarEmpleado(Empleado Empleado)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre", Empleado.Nombre),
                new Parametro("@Apellido", Empleado.Apellido?.ToString()),
                new Parametro("@ID_pais", Empleado.ID_pais?.ToString()),
                new Parametro("@ID_estado", Empleado.ID_estado?.ToString()),
                new Parametro("@ID_municipio", Empleado.ID_municipio?.ToString()),
                new Parametro("@Calle", Empleado.Calle),
                new Parametro("@Correo", Empleado.Correo),
                new Parametro("@Numero_telefono", Empleado.Numero_telefono),
                new Parametro("@Fecha_nacimiento", Empleado.Fecha_nacimiento),
                new Parametro("@ID_Cargo", Empleado.ID_cargo.ToString()),
                //new Parametro("@Estado_empleado", Empleado.Estado_empleado.HasValue ? (Empleado.Estado_empleado.Value ? "1" : "0") : null),
                new Parametro("@Clave", Empleado.Clave)
            };


            dynamic result = DBDatos.Ejecutar("GestionEmpleado", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarEmpleado(Empleado Empleado)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_Empleado", Empleado.ID_empleado?.ToString()),
            new Parametro("@Nombre", Empleado.Nombre),
            new Parametro("@Apellido", Empleado.Apellido?.ToString()),
            new Parametro("@ID_pais", Empleado.ID_pais?.ToString()),
            new Parametro("@ID_estado", Empleado.ID_estado?.ToString()),
            new Parametro("@ID_municipio", Empleado.ID_municipio?.ToString()),
            new Parametro("@Calle", Empleado.Calle),
            new Parametro("@Correo", Empleado.Correo),
            new Parametro("@Numero_telefono", Empleado.Numero_telefono),
            new Parametro("@Fecha_nacimiento", Empleado.Fecha_nacimiento),
            new Parametro("@ID_Cargo", Empleado.ID_cargo.ToString()),
            new Parametro("@Estado_empleado", Empleado.Estado_empleado.HasValue ? (Empleado.Estado_empleado.Value ? "1" : "0") : null)
        };

            dynamic result = DBDatos.Ejecutar("GestionEmpleado", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

       

    }
}

