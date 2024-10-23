using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Clientes")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClienteController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarCliente()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tClientes = DBDatos.Listar("GestionCliente", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var ClientesList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tClientes.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tClientes.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                ClientesList.Add(dict);
            }

            string jsonCliente = JsonSerializer.Serialize(ClientesList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Cliente = JsonSerializer.Deserialize<List<Cliente>>(jsonCliente)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarCliente(Cliente Cliente)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Nombre", Cliente.Nombre),
                new Parametro("@Apellido", Cliente.Apellido?.ToString()),
                new Parametro("@ID_pais", Cliente.ID_pais?.ToString()),
                new Parametro("@ID_estado", Cliente.ID_estado?.ToString()),
                new Parametro("@ID_municipio", Cliente.ID_municipio?.ToString()),
                new Parametro("@Calle", Cliente.Calle),
                new Parametro("@Correo", Cliente.Correo),
                new Parametro("@Numero_telefono", Cliente.Numero_telefono),
                new Parametro("@Fecha_nacimiento", Cliente.Fecha_nacimiento),
                new Parametro("@Estado_renta", Cliente.Estado_renta.HasValue ? (Cliente.Estado_renta.Value ? "1" : "0") : null)
            };


            dynamic result = DBDatos.Ejecutar("GestionCliente", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarCliente(Cliente Cliente)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_cliente", Cliente.ID_cliente?.ToString()),
            new Parametro("@Nombre", Cliente.Nombre),
            new Parametro("@Apellido", Cliente.Apellido?.ToString()),
            new Parametro("@ID_pais", Cliente.ID_pais?.ToString()),
            new Parametro("@ID_estado", Cliente.ID_estado?.ToString()),
            new Parametro("@ID_municipio", Cliente.ID_municipio?.ToString()),
            new Parametro("@Calle", Cliente.Calle),
            new Parametro("@Correo", Cliente.Correo),
            new Parametro("@Numero_telefono", Cliente.Numero_telefono),
            new Parametro("@Fecha_nacimiento", Cliente.Fecha_nacimiento),
            new Parametro("@Estado_renta", Cliente.Estado_renta.HasValue ? (Cliente.Estado_renta.Value ? "1" : "0") : null)
        };

            dynamic result = DBDatos.Ejecutar("GestionCliente", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

       

    }
}

