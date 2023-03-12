using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ntoprep
{
    /// <summary>
    /// Interaction logic for NavigationPage.xaml
    /// </summary>
    public partial class NavigationPage : Page
    {
        Employee employee;
        public NavigationPage(Employee employee)
        {
            this.employee = employee;
            InitializeComponent();
            Manager.MainFrame = mainFrame;
            Manager.MainFrame.Navigate(new NomenclaturePage());
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new NomenclaturePage());
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new PricePage());
        }

        private void Button_Click_station(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new StationPage());
        }

        private void Button_Click_1_event(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new EventsPage());
        }

        private void BtnClients_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new ClientsControlPage());
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new ReportPage());
        }

        private void Cheli_Click(object sender, RoutedEventArgs e)
        {
            Manager.MainFrame.Navigate(new PersonPage());
        }
    }
}
