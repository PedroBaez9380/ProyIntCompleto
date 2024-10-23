using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("DetalleRentas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DetalleRentaController : ControllerBase
    {


        [HttpGet]
        [Route("Traer/{ID_renta}")]
        public dynamic listarDetalleRenta(int ID_renta)
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                    new Parametro("@ID_renta", ID_renta.ToString()),
                }; 

            DataTable tDetalleRentas = DBDatos.Listar("GestionDetalleRenta", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var DetalleRentasList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tDetalleRentas.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tDetalleRentas.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                DetalleRentasList.Add(dict);
            }

            string jsonDetalleRenta = JsonSerializer.Serialize(DetalleRentasList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    DetalleRenta = JsonSerializer.Deserialize<List<DetalleRenta>>(jsonDetalleRenta)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarDetalleRenta(DetalleRenta DetalleRenta)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@ID_renta", DetalleRenta.ID_renta.ToString()),
                new Parametro("@ID_libro", DetalleRenta.ID_libro.ToString()),
                new Parametro("@ID_condicion", DetalleRenta.ID_condicion.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionDetalleRenta", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        //[HttpPut]
        //[Route("Actualizar")]
        //public dynamic ActualizarDetalleRenta(DetalleRenta DetalleRenta)
        //{
        //    List<Parametro> parametros = new List<Parametro>
        //{
        //    new Parametro("@Operacion", "UPDATE"),
        //    new Parametro("@ID_DetalleRenta", DetalleRenta.ID_DetalleRenta.ToString()),
        //    new Parametro("@Nombre_DetalleRenta", DetalleRenta.Nombre_DetalleRenta),
        //    new Parametro("@ID_pais", DetalleRenta.ID_pais.ToString()),
        //};

        //    dynamic result = DBDatos.Ejecutar("GestionDetalleRenta", parametros);

        //    return new
        //    {
        //        success = result.exito.ToString(),
        //        message = result.mensaje,
        //        result = ""
        //    };
        //}

        //[HttpDelete]
        //[Route("Borrar")]
        //public dynamic BorrarDetalleRenta(DetalleRenta DetalleRenta)
        //{
        //    List<Parametro> parametros = new List<Parametro>
        //{
        //    new Parametro("@Operacion", "DELETE"),
        //    new Parametro("@ID_DetalleRenta", DetalleRenta.ID_DetalleRenta.ToString()),
        //};

        //    dynamic result = DBDatos.Ejecutar("GestionDetalleRenta", parametros);

        //    return new
        //    {
        //        success = result.exito.ToString(),
        //        message = result.mensaje,
        //        result = ""
        //    };
        //}

    }
}

