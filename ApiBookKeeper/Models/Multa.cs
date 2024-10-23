using System;

namespace ApiBookKeeper.Models
{
    public class Multa
    {
        public int? ID_multa { get; set; }
        public string? Motivo { get; set; }
        public decimal? Monto { get; set; }
        public string? Metodo_pago { get; set; }
        public string? Numero_tarjeta { get; set; }
        public string? Fecha_multa { get; set; }
        public int? ID_tipo_multa { get; set; }
        public string? Descripcion { get; set; }
        public int? ID_renta { get; set; }
    }
}
