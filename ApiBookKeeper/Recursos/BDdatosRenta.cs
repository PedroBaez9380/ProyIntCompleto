using ApiBookKeeper.Recursos;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata;

namespace ApiBookKeeper.Recursos
{
    public class DBDatosRenta
    {
        public static string cadenaConexion = "Data Source=DESKTOP-4LQIH7E\\SQLEXPRESS;Initial Catalog=BookKeeperDB;Integrated Security=True;";
        public static DataSet ListarTablas(string nombreProcedimiento, List<Parametro> parametros = null)
        {
            SqlConnection conexion = new SqlConnection(cadenaConexion);

            try
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand(nombreProcedimiento, conexion);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                if (parametros != null)
                {
                    foreach (var parametro in parametros)
                    {
                        cmd.Parameters.AddWithValue(parametro.Nombre, parametro.Valor);
                    }
                }
                DataSet tabla = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(tabla);


                return tabla;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                conexion.Close();
            }
        }

        public static DataTable Listar(string nombreProcedimiento, List<Parametro> parametros = null)
        {
            SqlConnection conexion = new SqlConnection(cadenaConexion);

            try
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand(nombreProcedimiento, conexion);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                if (parametros != null)
                {
                    foreach (var parametro in parametros)
                    {
                        cmd.Parameters.AddWithValue(parametro.Nombre, parametro.Valor);
                    }
                }
                DataTable tabla = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(tabla);


                return tabla;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                conexion.Close();
            }
        }

        public static dynamic Ejecutar(string nombreProcedimiento, List<Parametro> parametros = null)
        {
            SqlConnection conexion = new SqlConnection(cadenaConexion);

            try
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand(nombreProcedimiento, conexion);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                if (parametros != null)
                {
                    foreach (var parametro in parametros)
                    {
                        cmd.Parameters.AddWithValue(parametro.Nombre, parametro.Valor);
                    }
                }

                // Ejecuta la consulta
                int filasAfectadas = cmd.ExecuteNonQuery();

                // Verifica si la consulta fue una inserción
                if (filasAfectadas > 0 && nombreProcedimiento.StartsWith("Insert", StringComparison.OrdinalIgnoreCase))
                {
                    // Si fue una inserción, obtén el último ID insertado
                    cmd.CommandText = "SELECT SCOPE_IDENTITY()";
                    int lastInsertId = Convert.ToInt32(cmd.ExecuteScalar());

                    // Devuelve el resultado con el último ID insertado
                    return new
                    {
                        exito = true,
                        mensaje = "exito",
                        LastInsertID = lastInsertId
                    };
                }
                else
                {
                    // Si no fue una inserción o no se afectaron filas, devuelve un resultado estándar
                    bool exito = (filasAfectadas > 0);
                    return new
                    {
                        exito = exito,
                        mensaje = "exito"
                    };
                }
            }
            catch (Exception ex)
            {
                return new
                {
                    exito = false,
                    mensaje = ex.Message
                };
            }
            finally
            {
                conexion.Close();
            }
        }

    }

}
