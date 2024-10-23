using System;

namespace ApiBookKeeper.Models
{
    public class Municipio
    {
        public int? ID_municipio { get; set; }
        public string? Nombre_municipio { get; set; }
        public int? ID_estado { get; set; }
        public string? Nombre_estado { get; set; }
    }
}
