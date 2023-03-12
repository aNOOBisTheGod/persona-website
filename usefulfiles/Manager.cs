using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace ntoprep
{
    class Manager
    {
        private static Frame mainFrame;
        private static Frame navigationFrame;
        public static Frame MainFrame { get => mainFrame; set => mainFrame = value; }
        public static Frame NavigationFrame { get => navigationFrame; set => navigationFrame = value; }
    }
}
