using System;

namespace ApiBookKeeper.Models
{
    public class Cliente
    {
        public int? ID_cliente { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public int? ID_pais { get; set; }
        public string? Nombre_pais { get; set; }
        public int? ID_estado { get; set; }
        public string? Nombre_estado { get; set; }
        public int? ID_municipio { get; set; }
        public string? Nombre_municipio { get; set; }
        public string? Calle { get; set; }
        public string? Correo { get; set; }
        public string? Numero_telefono { get; set; }
        public string? Fecha_registro { get; set; }
        public string? Fecha_nacimiento { get; set; }
        public bool? Estado_renta { get; set; }

    }
}
