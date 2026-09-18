using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SQL_ROTARY
{
    public partial class FrmRecursos : Form
    {
        public FrmRecursos()
        {
            InitializeComponent();
        }
        CAcceso obj = new CAcceso();

        private void FrmRecursos_Load(object sender, EventArgs e)
        {
            Cargador.Cargar(this, GnvRecurso, obj, "SPMOSTRARRECURSOS");
        }
    }
}
