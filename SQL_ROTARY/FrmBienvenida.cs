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
    public partial class FrmBienvenida : Form
    {
        public FrmBienvenida()
        {
            InitializeComponent();
        }

        private void menuproyecto_Click(object sender, EventArgs e)
        {
            using (var obj = new FrmProyecto())
            {
                obj.ShowDialog(this);
            }
        }

        private void menueventos_Click(object sender, EventArgs e)
        {
            using (var obj = new FrmEventos())
            {
                obj.ShowDialog(this);
            }
        }

        private void menurecursos_Click(object sender, EventArgs e)
        {
            using (var obj = new FrmRecursos())
            {
                obj.ShowDialog(this);
            }
        }

        private void menufinanzas_Click(object sender, EventArgs e)
        {
            using (var obj = new FrmFinanzas())
            {
                obj.ShowDialog(this);
            }
        }

        private void menuvoluntarios_Click(object sender, EventArgs e)
        {
            using (var obj = new FrmVoluntarios())
            {
                obj.ShowDialog(this);
            }
        }

        private void menusocios_Click(object sender, EventArgs e)
        {
            using (var obj = new FrmSocios())
            {
                obj.ShowDialog(this);
            }
        }

        private void menubeneficiarios_Click(object sender, EventArgs e)
        {
            using (var obj = new FrmBeneficiarios())
            {
                obj.ShowDialog(this);
            }
        }

        

        }
    }

