using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Xunit;

namespace SQL_ROTARY.Tests
{
    public class ConexionConfigTests
    {
        private static Func<string, string> Lector(Dictionary<string, string> d)
        {
            return k => d.TryGetValue(k, out var v) ? v : null;
        }

        [Fact]
        public void SinConfiguracion_UsaValoresPorDefectoYAutenticacionIntegrada()
        {
            var cfg = ConexionConfig.Desde(Lector(new Dictionary<string, string>()));
            var b = new SqlConnectionStringBuilder(cfg.CadenaConexion());

            Assert.Equal(ConexionConfig.ServidorPorDefecto, b.DataSource);
            Assert.Equal("BD_ROTARY", b.InitialCatalog);
            Assert.True(b.IntegratedSecurity);
            Assert.False(cfg.UsaAutenticacionSql);
        }

        [Fact]
        public void ConUsuario_UsaAutenticacionSql()
        {
            var cfg = ConexionConfig.Desde(Lector(new Dictionary<string, string>
            {
                [ConexionConfig.ClaveServidor] = "srv",
                [ConexionConfig.ClaveBaseDatos] = "db",
                [ConexionConfig.ClaveUsuario] = "sa",
                [ConexionConfig.ClavePassword] = "clave"
            }));
            var b = new SqlConnectionStringBuilder(cfg.CadenaConexion());

            Assert.False(b.IntegratedSecurity);
            Assert.Equal("sa", b.UserID);
            Assert.Equal("clave", b.Password);
            Assert.Equal("srv", b.DataSource);
        }

        [Fact]
        public void PasswordConPuntoYComa_NoInyectaOtrasOpciones()
        {
            var cfg = ConexionConfig.Desde(Lector(new Dictionary<string, string>
            {
                [ConexionConfig.ClaveUsuario] = "app",
                [ConexionConfig.ClavePassword] = "x;Integrated Security=True;Initial Catalog=master"
            }));
            var b = new SqlConnectionStringBuilder(cfg.CadenaConexion());

            Assert.False(b.IntegratedSecurity);
            Assert.Equal("BD_ROTARY", b.InitialCatalog);
            Assert.Equal("x;Integrated Security=True;Initial Catalog=master", b.Password);
        }

        [Fact]
        public void ValoresEnBlanco_CaenAlPorDefecto()
        {
            var cfg = ConexionConfig.Desde(Lector(new Dictionary<string, string>
            {
                [ConexionConfig.ClaveServidor] = "   ",
                [ConexionConfig.ClaveBaseDatos] = "",
                [ConexionConfig.ClaveUsuario] = " "
            }));

            Assert.Equal(ConexionConfig.ServidorPorDefecto, cfg.Servidor);
            Assert.Equal(ConexionConfig.BaseDatosPorDefecto, cfg.BaseDatos);
            Assert.False(cfg.UsaAutenticacionSql);
        }

        [Fact]
        public void SinServidorOBaseDeDatos_LanzaInvalidOperation()
        {
            var cfg = new ConexionConfig { Servidor = "", BaseDatos = "x" };
            Assert.Throws<InvalidOperationException>(() => cfg.CadenaConexion());
            cfg = new ConexionConfig { Servidor = "x", BaseDatos = null };
            Assert.Throws<InvalidOperationException>(() => cfg.CadenaConexion());
        }

        [Fact]
        public void LectorNulo_LanzaArgumentNull()
        {
            Assert.Throws<ArgumentNullException>(() => ConexionConfig.Desde(null));
        }

        [Fact]
        public void CAcceso_PropagaLaConfiguracion_SinServidorFijo()
        {
            var acc = new CAcceso(new ConexionConfig { Servidor = "otro", BaseDatos = "bd" });
            var b = new SqlConnectionStringBuilder(acc.pCadenaConexion);

            Assert.Equal("otro", b.DataSource);
            Assert.DoesNotContain("DESKTOP-S0REQAM", acc.pCadenaConexion);
        }
    }

    public class ParametrosTests
    {
        // Simula un procedimiento derivado: parametro 0 = @RETURN_VALUE.
        private static SqlCommand ComandoConParametros(params SqlParameter[] extra)
        {
            var com = new SqlCommand("SPX") { CommandType = CommandType.StoredProcedure };
            com.Parameters.Add(new SqlParameter("@RETURN_VALUE", SqlDbType.Int) { Direction = ParameterDirection.ReturnValue });
            foreach (var p in extra) com.Parameters.Add(p);
            return com;
        }

        [Fact]
        public void AsignarParametros_SaltaReturnValueYAsignaEnOrden()
        {
            var com = ComandoConParametros(
                new SqlParameter("@a", SqlDbType.Int),
                new SqlParameter("@b", SqlDbType.NVarChar, 20));

            CAcceso.AsignarParametros(com, new object[] { 7, "hola" });

            Assert.Equal(7, com.Parameters["@a"].Value);
            Assert.Equal("hola", com.Parameters["@b"].Value);
        }

        [Fact]
        public void AsignarParametros_NullYFaltantes_SeEnvianComoDBNull()
        {
            var com = ComandoConParametros(
                new SqlParameter("@a", SqlDbType.Int),
                new SqlParameter("@b", SqlDbType.Int));

            CAcceso.AsignarParametros(com, new object[] { null });

            Assert.Same(DBNull.Value, com.Parameters["@a"].Value);
            Assert.Same(DBNull.Value, com.Parameters["@b"].Value);
        }

        [Fact]
        public void AsignarParametros_ArgumentosNulos_NoFalla()
        {
            var com = ComandoConParametros(new SqlParameter("@a", SqlDbType.Int));
            CAcceso.AsignarParametros(com, null);
            Assert.Same(DBNull.Value, com.Parameters["@a"].Value);
        }

        [Fact]
        public void RecogerSalidas_MapeaCadaParametroConSuArgumento_IncluidoElUltimo()
        {
            var com = ComandoConParametros(
                new SqlParameter("@entrada", SqlDbType.Int) { Value = 1 },
                new SqlParameter("@id", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 99 },
                new SqlParameter("@total", SqlDbType.Int) { Direction = ParameterDirection.InputOutput, Value = 5 });
            var args = new object[] { 1, null, null };

            CAcceso.RecogerSalidas(com, args);

            Assert.Equal(1, args[0]);   // entrada intacta
            Assert.Equal(99, args[1]);
            Assert.Equal(5, args[2]);   // el ultimo parametro tambien se copia
        }

        [Fact]
        public void RecogerSalidas_ConMenosArgumentosQueParametros_NoDesborda()
        {
            var com = ComandoConParametros(
                new SqlParameter("@id", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 3 },
                new SqlParameter("@x", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 4 });
            var args = new object[] { null };

            CAcceso.RecogerSalidas(com, args);

            Assert.Equal(3, args[0]);
        }

        [Fact]
        public void ValorDeSalida_DevuelveElUltimoOutput_YNullSiNoHay()
        {
            var com = ComandoConParametros(new SqlParameter("@a", SqlDbType.Int) { Value = 1 });
            Assert.Null(CAcceso.ValorDeSalida(com));

            com.Parameters.Add(new SqlParameter("@o1", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 10 });
            com.Parameters.Add(new SqlParameter("@o2", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 20 });
            Assert.Equal(20, CAcceso.ValorDeSalida(com));
        }
    }

    public class MensajesErrorTests
    {
        [Theory]
        [InlineData(53, "servidor")]
        [InlineData(-1, "servidor")]
        [InlineData(4060, "base de datos")]
        [InlineData(18456, "sesión")]
        [InlineData(2812, "procedimiento")]
        public void CodigosConocidos_DanMensajeEspecifico(int numero, string fragmento)
        {
            Assert.Contains(fragmento, MensajesError.Describir(numero, "orig"), StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public void CodigoDesconocido_IncluyeNumeroYMensajeOriginal()
        {
            var m = MensajesError.Describir(12345, "boom");
            Assert.Contains("12345", m);
            Assert.Contains("boom", m);
        }

        [Fact]
        public void ExcepcionGenerica_YNula()
        {
            Assert.Contains("inesperado", MensajesError.Describir(new Exception("x")));
            Assert.Contains("conexión", MensajesError.Describir(new InvalidOperationException("y")));
            Assert.Equal("Error desconocido.", MensajesError.Describir(null));
        }
    }
}
