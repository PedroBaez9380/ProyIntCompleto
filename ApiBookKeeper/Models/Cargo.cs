using System;

namespace ApiBookKeeper.Models
{
    public class Cargo
    {
        public int? ID_cargo { get; set; }
        public string? Descripcion { get; set; }
        public int? ID_rol { get; set; }
        public string? Descripcion_rol { get; set; }
    }
}
