using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ntoprep
{
    class EmailSender
    {
        static public string SendEmail(string subj, string text, string emailTo)
        {
            try
            {
                MailAddress to = new MailAddress(emailTo, "m");
                MailAddress from = new MailAddress("emaildef@yandex.ru");

                MailMessage message = new MailMessage(from, to);
                message.Subject = subj;
                message.Body = text;
                message.IsBodyHtml = true;
                SmtpClient mySmtpClient = new SmtpClient("smtp.yandex.ru", 587);
                mySmtpClient.UseDefaultCredentials = false;
                mySmtpClient.EnableSsl = true;
                mySmtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                mySmtpClient.Credentials = new NetworkCredential("emaildef@yandex.ru", password: "bxzvxfobjudqdmyh");
                mySmtpClient.Send(message);
                return null;
            }
            catch (Exception ex)
            {
                return "Возникла ошибка. Письмо не было отправлено.\nПроверьте корректен ли введённый адрес электронной почты." + ex.ToString();
            }
        }

    }
}