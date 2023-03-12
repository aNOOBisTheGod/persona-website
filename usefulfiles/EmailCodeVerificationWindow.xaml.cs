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
using System.Windows.Shapes;

namespace ntoprep
{
    /// <summary>
    /// Interaction logic for EmailCodeVerificationWindow.xaml
    /// </summary>
    public partial class EmailCodeVerificationWindow : Window
    {
        private string verificationCode;
        public bool emailVerified = false;

        public EmailCodeVerificationWindow(string code)
        {
            InitializeComponent();
            verificationCode = code;
        }

        private void Code_TextChanged(object sender, TextChangedEventArgs e)
        {

            if (CodeBox.IsMaskCompleted)
            {
                if (CodeBox.Text.ToString().Remove(4, 1) == verificationCode)
                {
                    MessageBox.Show("Регистрация произведена успешно");
                    emailVerified = true;

                    Manager.NavigationFrame.Navigate(new LogInOrSignUp());
                    this.Close();
                }
                else
                {
                    IncorrectCodeTextBlock.Text = "Введен неверный код";
                    BtnReSent.IsEnabled = true;
                }
            }
        }

        private void BtnChangeEmail_Clcik(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void BtnReSentCode_Clcik(object sender, RoutedEventArgs e)
        {
            Random rnd = new Random();
            string code = rnd.Next(10000000, 99999999).ToString();

            MessageBox.Show(code);

            // отправляем письмо(MailBox.Text, code);

            this.Close();

            var modalWindow = new EmailCodeVerificationWindow(code);
            modalWindow.ShowDialog();
        }
    }
}
