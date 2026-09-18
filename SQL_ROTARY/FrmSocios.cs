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
    public partial class FrmSocios : Form
    {
        public FrmSocios()
        {
            InitializeComponent();
        }
        CAcceso obj = new CAcceso();

        private void FrmSocios_Load(object sender, EventArgs e)
        {
            Cargador.Cargar(this, GnvSocios, obj, "SPMOSTRARSOCIOS");

        }
    }
}
