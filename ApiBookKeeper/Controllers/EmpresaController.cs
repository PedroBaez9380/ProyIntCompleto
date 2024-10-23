using Microsoft.AspNetCore.Mvc;
using ApiBookKeeper.Recursos;
using ApiBookKeeper.Models;
using System.Data;
using System.Web.Http.Cors;
using System.Text.Json;


namespace ApiHBNS.Controllers
{
    [ApiController]
    [Route("Empresaes")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmpresaController : ControllerBase
    {


        [HttpGet]
        [Route("Traer")]
        public dynamic listarEmpresa()
        {
            List<Parametro> parametros = new List<Parametro>
                {
                    new Parametro("@Operacion", "SELECT"),
                }; 

            DataTable tEmpresa = DBDatos.Listar("GestionEmpresa", parametros);

            // Funcion para convertir la DataTable a una lista de diccionarios
            var EmpresaList = new List<Dictionary<string, object>>();
            foreach (DataRow row in tEmpresa.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in tEmpresa.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                EmpresaList.Add(dict);
            }

            string jsonEmpresa = JsonSerializer.Serialize(EmpresaList);

            return new
            {
                success = true,
                message = "exito",
                result = new
                {
                    Empresa = JsonSerializer.Deserialize<List<Empresa>>(jsonEmpresa)
                }
            };
        }
        //[HttpPost]
        //[Route("Guardar")]
        //public dynamic GuardarEmpresa(Empresa Empresa)
        //{

        //    List<Parametro> parametros = new List<Parametro>
        //    {
        //        new Parametro("@Operacion", "INSERT"),
        //        new Parametro("@Nombre_pais", Empresa.Nombre),
        //    };

        //    dynamic result = DBDatos.Ejecutar("GestionEmpresa", parametros);

        //    return new
        //    {
        //        success = result.exito.ToString(),
        //        message = result.mensaje,
        //        result = ""
        //    };
        //}

        [HttpPut]
        [Route("Actualizar")]
        public dynamic ActualizarEmpresa(Empresa Empresa)
        {
            List<Parametro> parametros = new List<Parametro>
        {
            new Parametro("@Operacion", "UPDATE"),
            new Parametro("@ID_empresa", Empresa.ID_empresa.ToString()),
            new Parametro("@Nombre", Empresa.Nombre),
            new Parametro("@ID_pais", Empresa.ID_pais.ToString()),
            new Parametro("@ID_estado", Empresa.ID_estado.ToString()),
            new Parametro("@ID_municipio", Empresa.ID_municipio.ToString()),
            new Parametro("@Calle", Empresa.Calle),
            new Parametro("@Correo", Empresa.Correo),
            new Parametro("@Numero_telefono", Empresa.Numero_telefono),
        };

            dynamic result = DBDatos.Ejecutar("GestionEmpresa", parametros);

            return new
            {
                success = result.exito.ToString(),
                message = result.mensaje,
                result = ""
            };
        }


        //[HttpDelete]
        //[Route("Borrar")]
        //public dynamic BorrarEmpresa(Empresa Empresa)
        //{
        //    List<Parametro> parametros = new List<Parametro>
        //{
        //    new Parametro("@Operacion", "DELETE"),
        //    new Parametro("@ID_pais", Empresa.ID_pais.ToString()),
        //};

        //    dynamic result = DBDatos.Ejecutar("GestionEmpresa", parametros);

        //    return new
        //    {
        //        success = result.exito.ToString(),
        //        message = result.mensaje,
        //        result = ""
        //    };
        //}

    }
}

