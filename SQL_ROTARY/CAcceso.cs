using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SQL_ROTARY
{
    /// <summary>
    /// Acceso a datos por procedimientos almacenados. Cada operación abre y
    /// cierra su propia conexión (using), salvo dentro de una transacción
    /// iniciada con <see cref="IniciarTransaccion"/>, que mantiene su conexión
    /// hasta Terminar/Abortar.
    /// </summary>
    internal class CAcceso
    {
        #region "Declaracion de Variables"
        protected string Servidor;
        protected string BaseDatos;
        protected string CadenaConexion;
        protected string Usuario;
        protected string Password;
        protected bool ModoMixto;
        private readonly Dictionary<string, SqlParameter[]> _plantillas =
            new Dictionary<string, SqlParameter[]>(StringComparer.OrdinalIgnoreCase);
        private readonly object _candado = new object();
        #endregion

        #region "Constructores"
        public CAcceso()
        {
            Configurar(ConexionConfig.Cargar());
        }

        public CAcceso(ConexionConfig config)
        {
            Configurar(config);
        }

        private void Configurar(ConexionConfig config)
        {
            Servidor = config.Servidor;
            BaseDatos = config.BaseDatos;
            Usuario = config.Usuario ?? "";
            Password = config.Password ?? "";
            ModoMixto = config.UsaAutenticacionSql;
            CadenaConexion = pCadenaConexion;
        }
        #endregion

        #region "Propiedades"
        public string pServidor
        {
            get { return Servidor; }
            set { Servidor = value; }
        }

        public string pBaseDatos
        {
            get { return BaseDatos; }
            set { BaseDatos = value; }
        }

        public string pCadenaConexion
        {
            get
            {
                return new ConexionConfig
                {
                    Servidor = Servidor,
                    BaseDatos = BaseDatos,
                    Usuario = ModoMixto ? Usuario : null,
                    Password = Password
                }.CadenaConexion();
            }
            set
            {
                CadenaConexion = value;
            }
        }
        #endregion

        #region "Parametros (logica pura, probada en SQL_ROTARY.Tests)"
        /// <summary>
        /// Asigna args a los parámetros de entrada en orden. El parámetro 0 es
        /// @RETURN_VALUE en los procedimientos almacenados. Los argumentos
        /// faltantes o null se envían como DBNull (un valor null en un
        /// SqlParameter significa "no enviado" y hace fallar la llamada).
        /// </summary>
        internal static void AsignarParametros(SqlCommand com, object[] args)
        {
            args = args ?? new object[0];
            for (int i = 1; i < com.Parameters.Count; i++)
            {
                SqlParameter p = com.Parameters[i];
                object v = (i - 1 < args.Length) ? args[i - 1] : null;
                p.Value = v ?? DBNull.Value;
            }
        }

        /// <summary>
        /// Copia los valores de parámetros de salida a la posición
        /// correspondiente de args (parámetro i -> args[i-1]).
        /// </summary>
        internal static void RecogerSalidas(SqlCommand com, object[] args)
        {
            if (args == null) return;
            for (int i = 1; i < com.Parameters.Count; i++)
            {
                SqlParameter p = com.Parameters[i];
                if ((p.Direction == ParameterDirection.InputOutput || p.Direction == ParameterDirection.Output)
                    && i - 1 < args.Length)
                    args[i - 1] = p.Value;
            }
        }

        /// <summary>Último valor de salida del comando, o null si no hay.</summary>
        internal static object ValorDeSalida(SqlCommand com)
        {
            object resp = null;
            foreach (SqlParameter p in com.Parameters)
                if (p.Direction == ParameterDirection.InputOutput || p.Direction == ParameterDirection.Output)
                    resp = p.Value;
            return resp;
        }
        #endregion

        #region "Privadas"
        private SqlCommand CrearComando(string procedimiento, SqlConnection con, SqlTransaction tran)
        {
            if (string.IsNullOrWhiteSpace(procedimiento))
                throw new ArgumentException("Falta el nombre del procedimiento almacenado.", "procedimiento");

            var com = new SqlCommand(procedimiento, con, tran) { CommandType = CommandType.StoredProcedure };
            SqlParameter[] plantilla;
            lock (_candado)
                _plantillas.TryGetValue(procedimiento, out plantilla);

            if (plantilla == null)
            {
                SqlCommandBuilder.DeriveParameters(com);
                var copia = new SqlParameter[com.Parameters.Count];
                for (int i = 0; i < copia.Length; i++)
                    copia[i] = (SqlParameter)((ICloneable)com.Parameters[i]).Clone();
                lock (_candado)
                    _plantillas[procedimiento] = copia;
            }
            else
            {
                foreach (SqlParameter p in plantilla)
                    com.Parameters.Add((SqlParameter)((ICloneable)p).Clone());
            }
            return com;
        }

        /// <summary>Ejecuta f con la conexión de la transacción activa o con una propia.</summary>
        private T Usar<T>(Func<SqlConnection, SqlTransaction, T> f)
        {
            if (mTransaccion != null)
                return f(mTransaccion.Connection, mTransaccion);
            using (var con = new SqlConnection(pCadenaConexion))
            {
                con.Open();
                return f(con, null);
            }
        }
        #endregion

        #region "Lecturas"
        /// <summary>Obtiene un DataSet a partir de un procedimiento almacenado y sus parámetros.</summary>
        public DataSet TraerDataset(string procedimiento, params object[] args)
        {
            return Usar((con, tran) =>
            {
                using (SqlCommand com = CrearComando(procedimiento, con, tran))
                {
                    AsignarParametros(com, args);
                    using (var da = new SqlDataAdapter(com))
                    {
                        var ds = new DataSet();
                        da.Fill(ds);
                        return ds;
                    }
                }
            });
        }

        /// <summary>Obtiene la primera tabla del resultado de un procedimiento almacenado.</summary>
        public DataTable TraerDataTable(string procedimiento, params object[] args)
        {
            DataSet ds = TraerDataset(procedimiento, args);
            if (ds.Tables.Count == 0)
                return new DataTable();
            return ds.Tables[0].Copy();
        }

        /// <summary>Ejecuta el procedimiento y devuelve su último parámetro de salida.</summary>
        public object TraerValor(string procedimiento, params object[] args)
        {
            return Usar((con, tran) =>
            {
                using (SqlCommand com = CrearComando(procedimiento, con, tran))
                {
                    AsignarParametros(com, args);
                    com.ExecuteNonQuery();
                    return ValorDeSalida(com);
                }
            });
        }
        #endregion

        #region "Acciones"
        /// <summary>Ejecuta un procedimiento y copia los parámetros de salida en args.</summary>
        public int Ejecutar(string procedimiento, params object[] args)
        {
            return Usar((con, tran) =>
            {
                using (SqlCommand com = CrearComando(procedimiento, con, tran))
                {
                    AsignarParametros(com, args);
                    int filas = com.ExecuteNonQuery();
                    RecogerSalidas(com, args);
                    return filas;
                }
            });
        }

        public int Ejecutar(string procedimiento, object[] args, SqlTransaction tran)
        {
            if (tran == null) throw new ArgumentNullException("tran");
            using (SqlCommand com = CrearComando(procedimiento, tran.Connection, tran))
            {
                AsignarParametros(com, args);
                int filas = com.ExecuteNonQuery();
                RecogerSalidas(com, args);
                return filas;
            }
        }
        #endregion

        #region "Transacciones"
        protected SqlTransaction mTransaccion;
        protected bool EnTransaccion = false;

        /// <summary>Comienza una transacción. Debe cerrarse con Terminar o Abortar.</summary>
        public SqlTransaction IniciarTransaccion()
        {
            if (EnTransaccion)
                throw new InvalidOperationException("Ya hay una transacción activa.");
            var con = new SqlConnection(pCadenaConexion);
            try
            {
                con.Open();
                mTransaccion = con.BeginTransaction();
            }
            catch
            {
                con.Dispose();
                throw;
            }
            EnTransaccion = true;
            return mTransaccion;
        }

        /// <summary>Confirma la transacción activa y libera su conexión.</summary>
        public void TerminarTransaccion()
        {
            CerrarTransaccion(true);
        }

        /// <summary>Cancela la transacción activa y libera su conexión.</summary>
        public void AbortarTransaccion()
        {
            CerrarTransaccion(false);
        }

        private void CerrarTransaccion(bool confirmar)
        {
            if (mTransaccion == null)
                throw new InvalidOperationException("No hay una transacción activa.");
            SqlTransaction t = mTransaccion;
            SqlConnection con = t.Connection;
            try
            {
                if (confirmar) t.Commit(); else t.Rollback();
            }
            finally
            {
                mTransaccion = null;
                EnTransaccion = false;
                t.Dispose();
                if (con != null) con.Dispose();
            }
        }
        #endregion
    }
}
