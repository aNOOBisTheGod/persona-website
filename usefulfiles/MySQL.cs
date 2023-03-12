using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ntoprep.controller
{
    class MySQL
    {
        public static string database = "da1x27dg9l6d8ocf";
        public static MySqlConnection CreateConnection()
        {
            MySqlConnection connection = new MySqlConnection("Server=lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;Database=" + database + ";port=3306;User Id=cusyci6h5x8hv8xu;password=dsegfshz4q1vpjo7;charset=utf8mb4;convert zero datetime=True");
            connection.Open();
            return connection;
        }
        public static MySqlCommand CreateCommand(string value)
        {
            return new MySqlCommand(value, CreateConnection());
        }
        public static int Perform(string command)
        {
            MySqlCommand mySqlCommand = CreateCommand(command);
            int result = mySqlCommand.ExecuteNonQuery();
            mySqlCommand.Connection.Close();
            return result;
        }
        public static DataRow[] Get(string command)
        {
            MySqlCommand mySqlCommand = CreateCommand(command);
            DataTable table = new DataTable();
            table.Load(mySqlCommand.ExecuteReader());
            DataRow[] rows = table.AsEnumerable().ToArray();
            mySqlCommand.Connection.Close();
            return rows;
        }
    }
}
