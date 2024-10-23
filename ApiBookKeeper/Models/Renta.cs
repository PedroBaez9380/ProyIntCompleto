using System;

namespace ApiBookKeeper.Models
{
    public class Renta
    {
        public int? ID_renta { get; set; }
        public string? Fecha_renta { get; set; }
        public string? Fecha_devolucion { get; set; }
        public string? Fecha_devolucion_real { get; set; }
        public int? ID_cliente { get; set; }
        public int? ID_empleado { get; set; }
    }
}
