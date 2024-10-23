namespace ApiBookKeeper.Recursos
{
    public class Parametro
    {
        private string v;
        private bool? estado_renta;

        public Parametro(string nombre, string valor)
        {
            Nombre = nombre;
            Valor = valor;
        }

        public Parametro(string v, bool? estado_renta)
        {
            this.v = v;
            this.estado_renta = estado_renta;
        }

        public string Nombre { get; set; }
        public string Valor { get; set; }

    }
}
