using System;
using System.Windows.Forms;

namespace SQL_ROTARY
{
    /// <summary>Carga una grilla desde un procedimiento almacenado sin bloquear la app si falla la BD.</summary>
    internal static class Cargador
    {
        public static void Cargar(IWin32Window dueno, DataGridView grilla, CAcceso acceso, string procedimiento)
        {
            try
            {
                grilla.DataSource = acceso.TraerDataTable(procedimiento);
            }
            catch (Exception ex)
            {
                MessageBox.Show(dueno, MensajesError.Describir(ex), "Rotary - Error de datos",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }
    }
}
