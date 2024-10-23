using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Cargos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CargoController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarCargo()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tCargos = DBDatos.Listar("GestionCargo", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var CargosList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tCargos.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tCargos.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                CargosList.Add(dict);
            }

            string jsonCargo = JsonSerializer.Serialize(CargosList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Cargo = JsonSerializer.Deserialize<List<Cargo>>(jsonCargo)
                }
            };
        }
        [HttpPost]
        [Route("Guardar")]
        public dynamic GuardarCargo(Cargo Cargo)
        {

            List<Parametro> parametros = new List<Parametro>
            {
                new Parametro("@Operacion", "INSERT"),
                new Parametro("@Descripcion", Cargo.Descripcion),
                new Parametro("@ID_rol", Cargo.ID_rol.ToString()),
            };

            dynamic result = DBDatos.Ejecutar("GestionCargo", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarCargo(Cargo Cargo)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_cargo", Cargo.ID_cargo.ToString()),
            new Parametro("@Descripcion", Cargo.Descripcion),
            new Parametro("@ID_rol", Cargo.ID_rol.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionCargo", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

        [HttpDelete]
        [Route("Borrar")]
        public dynamic BorrarCargo(Cargo Cargo)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "DELETE"),
            new Parametro("@ID_cargo", Cargo.ID_cargo.ToString()),
        };

            dynamic result = DBDatos.Ejecutar("GestionCargo", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }

    }
}

