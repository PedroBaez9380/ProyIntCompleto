using System;

namespace ApiBookKeeper.Models
{
    public class Empresa
    {
        public int? ID_empresa { get; set; }
        public string? Nombre { get; set; }
        public int? ID_pais { get; set; }
        public string? Nombre_pais { get; set; }
        public int? ID_estado { get; set; }
        public string? Nombre_estado { get; set; }
        public int? ID_municipio { get; set; }
        public string? Nombre_municipio { get; set; }
        public string? Calle { get; set; }
        public string? Correo { get; set; }
        public string? Numero_telefono { get; set; }
    }
}
