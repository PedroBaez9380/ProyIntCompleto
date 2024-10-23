using System;

namespace ApiBookKeeper.Models
{
    public class TipoMulta
    {
        public int? ID_tipo_multa { get; set; }
        public string? Descripcion { get; set; }
        public decimal? Tarifa { get; set; }
    }
}
