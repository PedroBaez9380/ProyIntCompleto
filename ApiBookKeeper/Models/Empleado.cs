using System;

namespace ApiBookKeeper.Models
{
    public class Empleado
    {
        public int? ID_empleado { get; set; }
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
        public string? Fecha_contratacion { get; set; }
        public string? Fecha_nacimiento { get; set; }
        public int? ID_cargo { get; set; }
        public string? Descripcion_cargo { get; set; }
        public bool? Estado_empleado { get; set; }
        public string? Clave { get; set; }

    }
}
