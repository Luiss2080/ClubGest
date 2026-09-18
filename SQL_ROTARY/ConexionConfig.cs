using System;
using System.Data.SqlClient;

namespace SQL_ROTARY
{
    /// <summary>
    /// Configuración de la conexión a SQL Server. No depende de Windows Forms
    /// para poder probarse de forma aislada.
    ///
    /// Los valores se leen (en este orden) de variables de entorno o de
    /// &lt;appSettings&gt; en App.config: ROTARY_SQL_SERVER, ROTARY_SQL_DATABASE,
    /// ROTARY_SQL_USER y ROTARY_SQL_PASSWORD. Si no hay usuario se usa
    /// autenticación integrada de Windows (sin contraseña en el código).
    /// </summary>
    internal sealed class ConexionConfig
    {
        public const string ClaveServidor = "ROTARY_SQL_SERVER";
        public const string ClaveBaseDatos = "ROTARY_SQL_DATABASE";
        public const string ClaveUsuario = "ROTARY_SQL_USER";
        public const string ClavePassword = "ROTARY_SQL_PASSWORD";

        public const string ServidorPorDefecto = @".\SQLEXPRESS";
        public const string BaseDatosPorDefecto = "BD_ROTARY";

        public string Servidor { get; set; }
        public string BaseDatos { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }

        public bool UsaAutenticacionSql
        {
            get { return !string.IsNullOrWhiteSpace(Usuario); }
        }

        /// <summary>
        /// Construye la configuración a partir de un lector de claves
        /// (variable de entorno / appSettings). Las claves ausentes o vacías
        /// usan el valor por defecto.
        /// </summary>
        public static ConexionConfig Desde(Func<string, string> leer)
        {
            if (leer == null) throw new ArgumentNullException("leer");
            return new ConexionConfig
            {
                Servidor = ValorONulo(leer(ClaveServidor)) ?? ServidorPorDefecto,
                BaseDatos = ValorONulo(leer(ClaveBaseDatos)) ?? BaseDatosPorDefecto,
                Usuario = ValorONulo(leer(ClaveUsuario)),
                Password = leer(ClavePassword)
            };
        }

        /// <summary>Lee de variables de entorno y luego de App.config.</summary>
        public static ConexionConfig Cargar()
        {
            return Desde(clave =>
                Environment.GetEnvironmentVariable(clave)
                ?? System.Configuration.ConfigurationManager.AppSettings[clave]);
        }

        /// <summary>
        /// Devuelve la cadena de conexión. Usa SqlConnectionStringBuilder, de modo que
        /// un valor con ';' o comillas no puede inyectar otras opciones.
        /// </summary>
        public string CadenaConexion()
        {
            if (string.IsNullOrWhiteSpace(Servidor) || string.IsNullOrWhiteSpace(BaseDatos))
                throw new InvalidOperationException(
                    "No se puede establecer la cadena de conexión: falta servidor o base de datos.");

            var b = new SqlConnectionStringBuilder
            {
                DataSource = Servidor.Trim(),
                InitialCatalog = BaseDatos.Trim(),
                PersistSecurityInfo = false
            };
            if (UsaAutenticacionSql)
            {
                b.IntegratedSecurity = false;
                b.UserID = Usuario.Trim();
                b.Password = Password ?? string.Empty;
            }
            else
            {
                b.IntegratedSecurity = true;
            }
            return b.ConnectionString;
        }

        private static string ValorONulo(string v)
        {
            return string.IsNullOrWhiteSpace(v) ? null : v.Trim();
        }
    }
}
