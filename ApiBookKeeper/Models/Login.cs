using System;

namespace ApiBookKeeper.Models
{
    public class Login
    {
        public string? Clave { get; set; }
        public int? ID_rol { get; set; }
        public bool? Estado_empleado { get; set; }
    }
}
