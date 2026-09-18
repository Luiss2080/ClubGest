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
    public partial class FrmVoluntarios : Form
    {
        public FrmVoluntarios()
        {
            InitializeComponent();
        }
        CAcceso obj = new CAcceso();

        private void FrmVoluntarios_Load(object sender, EventArgs e)
        {
            Cargador.Cargar(this, GnvVoluntarios, obj, "SPMOSTRARVOLUNTARIOS");

        }
    }
}
