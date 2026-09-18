using System;

namespace SQL_ROTARY
{
    /// <summary>Traduce errores de SQL Server a mensajes comprensibles (sin dependencias de UI).</summary>
    internal static class MensajesError
    {
        public static string Describir(Exception ex)
        {
            if (ex == null) return "Error desconocido.";
            var sql = ex as System.Data.SqlClient.SqlException;
            if (sql != null)
                return Describir(sql.Number, sql.Message);
            if (ex is InvalidOperationException)
                return "No se pudo abrir la conexión con la base de datos: " + ex.Message;
            return "Ocurrió un error inesperado: " + ex.Message;
        }

        public static string Describir(int numeroSql, string mensajeOriginal)
        {
            switch (numeroSql)
            {
                case 2:
                case 53:
                case -1:
                    return "No se pudo conectar con el servidor SQL Server. Verifique que el servicio esté iniciado y que ROTARY_SQL_SERVER sea correcto.";
                case 4060:
                    return "La base de datos configurada no existe o no hay acceso a ella (ROTARY_SQL_DATABASE).";
                case 18456:
                    return "Inicio de sesión rechazado por SQL Server. Revise el usuario/contraseña o los permisos de Windows.";
                case 2812:
                    return "No se encontró el procedimiento almacenado. ¿Se restauró BD_ROTARY.bak?";
                default:
                    return "Error de base de datos (" + numeroSql + "): " + mensajeOriginal;
            }
        }
    }
}
