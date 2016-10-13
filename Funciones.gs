
function doGet() {
  var data = Charts.newDataTable()
      .addColumn(Charts.ColumnType.STRING, 'Month')
      .addColumn(Charts.ColumnType.NUMBER, 'In Store')
      .addColumn(Charts.ColumnType.NUMBER, 'Online')
      .addRow(['January', 10, 1])
      .addRow(['February', 12, 1])
      .addRow(['March', 20, 2])
      .addRow(['April', 25, 3])
      .addRow(['May', 30, 4])
      .build();

  var chart = Charts.newAreaChart()
      .setDataTable(data)
      .setStacked()
      .setRange(0, 40)
      .setTitle('Sales per Month')
      .build();

  var uiApp = UiApp.createApplication().setTitle('My Chart');
  uiApp.add(chart);
  return uiApp;
}


 function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }















