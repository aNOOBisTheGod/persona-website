import pymysql
import ast
from translate import Translator

host = 'server197.hosting.reg.ru'
user = 'u1964423_anoobis'
pw = 'something'
port = '3306'
db = 'u1964423_ntotestbd'
connection = pymysql.connect(host=host,
                             user=user,
                             password=pw,
                             database=db,
                             cursorclass=pymysql.cursors.DictCursor)
translator = Translator(to_lang="ru")
task = open("task.txt", "r").read().split(':')
name = task[0]
args = ast.literal_eval(task[1])


def create_table():
    query = f"CREATE TABLE {name}s ("
    for i in range(len(args)):
        if i != len(args) - 1:
            query += f"{args[i][0]} {args[i][1]}, "
        else:
            query += f"{args[i][0]} {args[i][1]})"
    print(query)
    with connection.cursor() as cursor:
        cursor.execute(query)
    connection.commit()


def create_class():
    properties_string = ""
    for i in args:
        if "integer" in i[1].lower():
            properties_string += 'int ' + i[0] + ';\n\t'
        elif "varchar" in i[1].lower():
            properties_string += 'string ' + i[0] + ';\n\t'
        elif "datetime" in i[1].lower():
            properties_string += 'DateTime ' + i[0] + ';\n\t'
    class_result = """using System;
namespace ntoprep
{
    public class %s
    {
    %s
    }
}
""" % (name.capitalize(), properties_string)
    with open(name.capitalize() + '.cs', 'w') as file:
        file.write(class_result)


def create_viewpage():
    txtcolumns = ""
    for i in args:
        txtcolumns += """<DataGridTextColumn Header="%s" Binding="{Binding %s}" Width="*"></DataGridTextColumn>\n""" % (
            translator.translate(i[0]).capitalize(), i[0].capitalize())
    pageTemplate = f"""
    <Page x:Class="OlympGenTest.Example"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
      xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
      xmlns:local="clr-namespace:OlympGenTest"
      mc:Ignorable="d" 
      d:DesignHeight="450" d:DesignWidth="800"
      Title="Туры">
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="*"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <DataGrid Name="DGrid{name.capitalize()}" Grid.RowSpan="1" IsReadOnly="True" AutoGenerateColumns="False">
                <DataGrid.Columns>
                    %s
                    <DataGridTemplateColumn>
                        <DataGridTemplateColumn.CellTemplate>
                            <DataTemplate>
                                <Button Content="Редактировать" Name="BtnEdit" Click="BtnEdit_Click"></Button>
                            </DataTemplate>
                        </DataGridTemplateColumn.CellTemplate>
                    </DataGridTemplateColumn>
                </DataGrid.Columns>
            </DataGrid>
        </Grid>
        <Button VerticalAlignment="Bottom" HorizontalAlignment="Right" Click="BtnAddClick">Добавить</Button>
    </Page>
    """ % txtcolumns
    print(f"""
    <Page Include="{name.capitalize()}Page.xaml">
      <SubType>Designer</SubType>
      <Generator>MSBuild:Compile</Generator>
    </Page>
    """)
    with open(name.capitalize() + "Page.xaml", "w", encoding="utf-8") as file:
        file.write(pageTemplate)


def create_viewback():
    properties_string = ""
    for i in args:
        if "integer" in i[1].lower():
            properties_string += f"""{name}.{i[0].capitalize()} = (int)row["{i[0]}"];\n"""
        elif "varchar" in i[1].lower():
            properties_string += f"""{name}.{i[0].capitalize()} = (string)row["{i[0]}"];\n"""
        elif "datetime" in i[1].lower():
            properties_string += f"""{name}.{i[0].capitalize()} = (DateTime)row["{i[0]}"];\n"""
    template = """
    using System.Windows.Controls;

    public partial class {Cname}Page : Page
    {{
        public {Cname}Page()
        {{
            InitializeComponent();
            updateDGrid();
        }}

        public void updateDGrid()
        {{
            List<{Cname}> output = new List<{Cname}>();
            foreach (DataRow row in MySQL.Get("SELECT * FROM {name}s"))
            {{
                {Cname} {name} = new {Cname}();
                {properties_string}
                output.Add({name});
            }}
            DGrid{Cname}.ItemsSource = output;
        }}


        private void BtnEdit_Click(object sender, RoutedEventArgs e)
        {{
            {Cname} current{Cname} = (sender as Button).DataContext as {Cname};
            Manager.MainFrame.Navigate(new Add{Cname}Page(current{Cname}));
        }}

        private void BtnAddClick(object sender, RoutedEventArgs e)
        {{
            Manager.MainFrame.Navigate(new Add{Cname}Page(null));
        }}
    }}
    """.format(Cname=name.capitalize(), name=name, properties_string=properties_string)
    print(f'''
    <Compile Include="{name.capitalize()}Page.xaml.cs">
      <DependentUpon>{name.capitalize()}Page.xaml</DependentUpon>
    </Compile>''')
    with open(name.capitalize() + "Page.xaml.cs", "w", encoding="utf-8") as file:
        file.write(template)


def create_addpage():
    rowDefinitions = """<RowDefinition Height="*"></RowDefinition>\n""" * \
        len(args)
    rowTexts = ""
    for i in range(len(args)):
        rowTexts += f"""<TextBlock Grid.Row="{i}" VerticalAlignment="Center">{args[i][0].capitalize()}</TextBlock>\n"""
    rowComponents = ""
    for i in range(len(args)):
        if "datetime" in args[i][1].lower():
            rowComponents += f"""<DatePicker Name="{args[i][0].capitalize()}Box" Grid.Row="{i}"></DatePicker>\n"""
        else:
            rowComponents += f"""<TextBox Name="{args[i][0].capitalize()}Box" Grid.Row="{i}"></TextBox>\n"""
    template = f"""
    <Page x:Class="OlympGenTest.Example"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
      xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
      xmlns:local="clr-namespace:OlympGenTest"
      mc:Ignorable="d" 
      d:DesignHeight="450" d:DesignWidth="800"
      Title="Туры">
    <Grid>
        <Grid.RowDefinitions>
            {rowDefinitions}
            <RowDefinition Height="auto"></RowDefinition>
        </Grid.RowDefinitions>
        {rowTexts}
        {rowComponents}
        <Button HorizontalAlignment="Right" Grid.Row="{len(args) + 1}" Click="BtnSave_Click">Сохранить</Button>
        <Button HorizontalAlignment="Left" Grid.Row="{len(args) + 1}" Click="BtnBack_Click">Назад</Button>
    </Grid>
    </Page>
    """
    print(f"""
    <Page Include="Add{name.capitalize()}Page.xaml">
      <SubType>Designer</SubType>
      <Generator>MSBuild:Compile</Generator>
    </Page>
    """)
    with open("Add" + name.capitalize() + "Page.xaml", "w", encoding="utf-8") as file:
        file.write(template)


def create_addback():

    boxesFill = ""
    for i in args:
        if "datetime" in i[1].lower():
            boxesFill += f"""{i[0].capitalize()}Box.SelectedDate = {name}.{i[0].capitalize()};\n"""
        else:
            boxesFill += f"""{i[0].capitalize()}Box.Text = {name}.{i[0].capitalize()};\n"""
    arguments = list(map(lambda x: x[0], args))

    def valuesFilter(x):
        if "datetime" in x[1].lower():
            return f"STR_TO_DATE('{{{x[0].capitalize()}Box.Text}}', '%d.%m.%Y')"
        else:
            return f"'{{{x[0].capitalize()}Box.Text}}'"
    values = list(map(valuesFilter, args))
    saveFunction = f"""
            MySQL.Perform($"INSERT INTO {name.upper()} ({', '.join(arguments)}) VALUES ({', '.join(values)})");
            Manager.MainFrame.Navigate(new {name.capitalize()}Page());
        """
    template = """
    using System.Windows.Controls;

    public partial class Add{Cname} : Page
    {{
        private bool isEditPage = false;
        public Add{Cname}({Cname} {name})
        {{
            InitializeComponent();

            if (!({name} is null))
            {{
                isEditPage = true;
                {boxesFill}
            }}
        }}

        private void BtnSave_Click(object sender, RoutedEventArgs e)
        {{
            if (MessageBox.Show($"Подтверждаете сохранение?", "Созрел вопрос", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.No)
            {{
                //do no stuff
            }}
            else
            {{
                {saveFunction}
            }}
        }}
        
        private void BtnBack_Click(object sender, RoutedEventArgs e)
        {{
            Manager.MainFrame.GoBack();
        }}
    }}
    """.format(Cname=name.capitalize(), name=name, boxesFill=boxesFill, saveFunction=saveFunction)
    print(f'''
    <Compile Include="Add{name.capitalize()}Page.xaml.cs">
      <DependentUpon>Add{name.capitalize()}Page.xaml</DependentUpon>
    </Compile>''')
    with open("Add" + name.capitalize() + "Page.xaml.cs", "w", encoding="utf-8") as file:
        file.write(template)


create_table()
create_class()
create_viewpage()
create_viewback()
create_addpage()
create_addback()
