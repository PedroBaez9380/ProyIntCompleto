using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Multas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MultaController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarMulta()
        {
            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "SELECT"),
            };

            DataTable tMultas = DBDatos.Listar("GestionMulta", parametros);

            var MultasList = new List<Multa>();
            foreach (DataRow row in tMultas.Rows)
            {
                var multa = new Multa
                {
                    ID_multa = row["ID_multa"] != DBNull.Value ? Convert.ToInt32(row["ID_multa"]) : (int?)null,
                    Motivo = row["Motivo"] != DBNull.Value ? row["Motivo"].ToString() : null,
                    Monto = row["Monto"] != DBNull.Value ? Convert.ToDecimal(row["Monto"]) : (decimal?)null,
                    Metodo_pago = row["Metodo_pago"] != DBNull.Value ? row["Metodo_pago"].ToString() : null,
                    Numero_tarjeta = row["Numero_tarjeta"] != DBNull.Value ? row["Numero_tarjeta"].ToString() : null,
                    Fecha_multa = row["Fecha_multa"] != DBNull.Value ? row["Fecha_multa"].ToString() : null,
                    ID_tipo_multa = row["ID_tipo_multa"] != DBNull.Value ? Convert.ToInt32(row["ID_tipo_multa"]) : (int?)null,
                    ID_renta = row["ID_renta"] != DBNull.Value ? Convert.ToInt32(row["ID_renta"]) : (int?)null,
                    //ID_cliente = row["ID_cliente"] != DBNull.Value ? Convert.ToInt32(row["ID_cliente"]) : (int?)null,
                };
                MultasList.Add(multa);
            }

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Multa = MultasList
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarMulta(Multa Multa)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Motivo", Multa.Motivo),
                new Parametro("@Metodo_pago", Multa.Metodo_pago),
                new Parametro("@Numero_tarjeta", Multa.Numero_tarjeta),
                new Parametro("@Monto", Multa.Monto.ToString()),
                //new Parametro("@Fecha_multa", Multa.Fecha_multa),
                new Parametro("@ID_tipo_multa", Multa.ID_tipo_multa.ToString()),
                new Parametro("@ID_renta", Multa.ID_renta.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionMulta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        //[HttpPut]
        //[Route("Actualizar")]
        //public dynamic ActualizarMulta(Multa Multa)
        //{
        //    List<Parametro> parametros = new List<Parametro>
        //{
        //    new Parametro("@Operacion", "INSERT"),
        //        new Parametro("@Motivo", Multa.Motivo),
        //        new Parametro("@Monto", Multa.Monto.ToString()),
        //        new Parametro("@Metodo_pago", Multa.Metodo_pago),
        //        new Parametro("@Numero_tarjeta", Multa.Numero_tarjeta),
        //        new Parametro("@ID_tipo_multa", Multa.ID_tipo_multa.ToString()),
        //        new Parametro("@ID_renta", Multa.ID_renta.ToString()),
        //};

        //    dynamic result = DBDatos.Ejecutar("GestionMulta", parametros);

        //    return new
        //    {
        //        success = result.exito.ToString(),
        //        message = result.mensaje,
        //        result = ""
        //    };
        //}

        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarMulta(Multa Multa)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_Multa", Multa.ID_multa.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionMulta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

