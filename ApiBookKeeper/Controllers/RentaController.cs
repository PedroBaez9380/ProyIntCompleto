using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Rentas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RentaController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarRenta()
        {
            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "SELECT"),
            };

            DataTable tRentas = DBDatos.Listar("GestionRenta", parametros);

            // Función para convertir la DataTable a una lista de diccionarios
            var RentasList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tRentas.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tRentas.Columns)
                {
                    var value = row[col];
                    dict[col.ColumnName] = value == DBNull.Value ? null : value;
                }
                RentasList.Add(dict);
            }

            string jsonRenta = JsonSerializer.Serialize(RentasList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Renta = JsonSerializer.Deserialize<List<Renta>>(jsonRenta)
                }
            };
        }

        [HttpGet]
        [Route("TraerUltimaRenta")]
        public dynamic listarUltimaRenta()
        {
            //List<Parametro> parametros = new List<Parametro>
            //{
            //    new Parametro("@Operacion", "SELECT"),
            //};

            DataTable tRentas = DBDatos.Listar("ObtenerUltimaRenta"/*, parametros*/);

            var RentasList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tRentas.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tRentas.Columns)
                {
                    var value = row[col];
                    dict[col.ColumnName] = value == DBNull.Value ? null : value;
                }
                RentasList.Add(dict);
            }

            string jsonRenta = JsonSerializer.Serialize(RentasList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Renta = JsonSerializer.Deserialize<List<Renta>>(jsonRenta)
                }
            };
        }

        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarRenta(Renta Renta)
        {
            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Fecha_devolucion", Renta.Fecha_devolucion),
                new Parametro("@ID_cliente", Renta.ID_cliente.ToString()),
                new Parametro("@ID_empleado", Renta.ID_empleado.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionRenta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };

        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarRenta(Renta Renta)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_renta", Renta.ID_renta.ToString()),
            new Parametro("@Fecha_devolucion_real", Renta.Fecha_devolucion_real),
        };

            dynamic result = DBDatos.Ejecutar("GestionRenta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarRenta(Renta Renta)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_renta", Renta.ID_renta.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionRenta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

