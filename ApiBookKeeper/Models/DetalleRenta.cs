using System;

namespace ApiBookKeeper.Models
{
    public class DetalleRenta
    {
        public int? ID_detalle_renta { get; set; }
        public int? ID_renta { get; set; }
        public int? ID_libro { get; set; }
        public int? ID_condicion { get; set; }
        public string? Descripcion { get; set; }
    }
}
