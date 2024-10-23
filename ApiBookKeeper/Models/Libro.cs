using System;

namespace ApiBookKeeper.Models
{
    public class Libro
    {
        public int? ID_libro { get; set; }
        public string? Titulo { get; set; }
        public string? Numero_ISBN { get; set; }
        public int? ID_editorial { get; set; }
        public string? Nombre_editorial { get; set; }
        public string? Year_publicacion { get; set; }
        public int? N_paginas { get; set; }
        public string? Tipo_pasta { get; set; }
        public int? ID_ubicacion { get; set; }
        public string? Seccion_ubicacion { get; set; }
        public int? Estanteria_ubicacion { get; set; }
        public int? ID_idioma { get; set; }
        public string? Nombre_idioma { get; set; }
        public int? ID_condicion { get; set; }
        public string? Descripcion_condicion { get; set; }
    }
}
