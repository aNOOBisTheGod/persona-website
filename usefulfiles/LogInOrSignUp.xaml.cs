using ntoprep.controller;
using System;
using System.Collections.Generic;
using System.Data;
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
    /// Interaction logic for LogInOrSignUp.xaml
    /// </summary>
    public partial class LogInOrSignUp : Page
    {
        public LogInOrSignUp()
        {
            InitializeComponent();
        }

        private void BtnLogIn_Click(object sender, RoutedEventArgs e)
        {
            int correct = MySQL.Get($"SELECT name FROM customers WHERE login = '{LoginBox.Text}' AND password = '{PasswordBox.Text}'").Length;
            if (correct == 0)
            {
                MessageBox.Show("Неверный логин или пароль");
                return;
            }
            DataRow user = MySQL.Get($"SELECT * FROM customers WHERE login = '{LoginBox.Text}' AND password = '{PasswordBox.Text}'")[0];
            Customer customer = new Customer();
            customer.Name = (string)user["name"];
            customer.Login = (string)user["login"];
            customer.Mail = (string)user["mail"];
            customer.BrithDate = (DateTime)user["birthDate"];
            customer.Number = (string)user["number"];
            customer.Status = (string)user["status"];
            customer.Points = (int)user["points"];
            customer.Password = (string)user["password"];
            if (user["hasPremium"].ToString() == "0")
            {
                MessageBox.Show("вы успешно вошли в стандартный лк");
                Manager.NavigationFrame.Navigate(new PersonalAccountPage(customer));
            }
            else
            {
                MessageBox.Show("вы успешно вошли в vip лк");
                Manager.NavigationFrame.Navigate(new PremiumPersonalAccountPage(customer));
            }
        }

        private void BtnSignUp_Click(object sender, RoutedEventArgs e)
        {
            Manager.NavigationFrame.Navigate(new SignUpPage());
        }
    }
}
