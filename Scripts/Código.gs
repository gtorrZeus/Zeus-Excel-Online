var SIDEBAR_TITLE = 'Zeus Tecnología S.A.';

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  try
  {
    SpreadsheetApp.getUi()       
      .createMenu('Zeus Tecnología S.A.')   
      //.addItem('Información del Sistema', 'showSidebar_Informacion')      
      //.addItem('Explorador de Funciones', 'showSidebar')      
      //.addItem('Selección Unidad de Negocio', 'showSeleccionUnidadNegocio')
      .addItem('Menú ZeusExcel', 'showSidebar_Menu')
      //.addItem('Seleccionar Archivo Drive', 'openDialog')
      //.addItem('Paneles Financieros Etapa 2', 'ShowSideBar_PFinancieros')
      //.addItem('Paneles Financieros Etapa 4', 'ShowSideBar_PFinancierosEt4')
      //.addItem('prueba correo', 'prueba_correo')
      //.addItem('Graficar', 'grafico')
      .addToUi();
      
      //getEmailUsarioActivo();// implementado para que el ultimo usuario que abre el libro en via su email
      setPropertyUser(Usuario);
      setActualEnterprise(getP_CurrentEnterprise());
      setP_CurrentAplication();
      setOwnerEmail();
      
      //SpreadsheetApp.getActiveSpreadsheet().toast('Usuario: '+Usuario, null, -1);
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox("Error", "Error: "+err.message+".", Browser.Buttons.OK);
  }
}

function prueba_correo() {
    Browser.msgBox(Session.getActiveUser().getEmail() +" Usuario: "+Propiedades.test()+" e-mail propietario: "+ getOwnerEmail()+" Empresa: "+getP_CurrentEnterprise()+" Aplicacion: "+getP_CurrentAplication());
}

function showSidebar() {
    var ui = HtmlService.createTemplateFromFile('ExploradorFunciones_Html')
        .evaluate()
        .setTitle(SIDEBAR_TITLE)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);      
    SpreadsheetApp.getUi().showSidebar(ui);
}

function showSidebar_Informacion() {
    var ui = HtmlService.createTemplateFromFile('SiderBar_Informacion')
        .evaluate()
        .setTitle(SIDEBAR_TITLE)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);      
    SpreadsheetApp.getUi().showSidebar(ui);
}

function showSeleccionUnidadNegocio() {
    var ui = HtmlService.createTemplateFromFile('ArbolBU_Html')
        .evaluate()
        .setTitle(SIDEBAR_TITLE)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);      
    SpreadsheetApp.getUi().showSidebar(ui);
}

function showSidebar_Menu() {
    var ui = HtmlService.createTemplateFromFile('MenuZeus_Html')
        .evaluate()
        .setTitle(SIDEBAR_TITLE)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui);
}

function ShowSideBar_PFinancieros(){
    var ui = HtmlService.createTemplateFromFile('PFinancieros_Html')
        .evaluate()
        .setTitle(SIDEBAR_TITLE)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui); 
}

function ShowSideBar_PFinancierosEt4(){
    var ui = HtmlService.createTemplateFromFile('PFinancierosEt4_Html')
        .evaluate()
        .setTitle(SIDEBAR_TITLE)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showSidebar(ui); 
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}

/**
  * Funcion para el recalculo de todas las hojas abiertas. 
  */
function Recacular_libro(){
     var b = 0;
     var Libro_Actual = SpreadsheetApp.getActive();
     var Libro_Actual_nombre = Libro_Actual.getName();
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     
     for(var item in ss.getSheets()){
         b++;
         var sheet = ss.getSheets()[item];         
         var sheet_name = sheet.getName();
                               
         recorrer_celdas_(sheet);
     }
     return b;
     Logger.log(b);
}

/**
  * Recorre todas las celdas de la hoja
  */
function recorrer_celdas_(sheet){
     var range = sheet.getDataRange();    
     var values = range.getFormulasR1C1();              
     // This logs the spreadsheet in CSV format with a trailing comma
     for (var i = 0; i < values.length; i++) {
           var row = "";
           for (var j = 0; j < values[i].length; j++) {
                 
                 row = values[i][j]; 
                 if (values[i][j]) { 
                   var valor1 = range.getCell(i+1,j+1).getFormulaR1C1();                   
                   range.getCell(i+1,j+1).setValue("  ");                   
                   var valor2 = range.getCell(i+1,j+1).getFormulaR1C1();                   
                   range.getCell(i+1,j+1).setValue(values[i][j]); 
                   var valor3  = range.getCell(i+1,j+1).getFormulaR1C1();                   
                 }         
           }       
     }
}

/**
 * Opens a dialog. The dialog structure is described in the Index.html
 * project file.
 */
function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('Picker.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, 'Select a file');  
}

function grafico() {    
   var sheet = SpreadsheetApp.getActiveSheet();
   var range = sheet.getRange("a1:b8")
   var chart = sheet.getCharts()[0];
   
   chart = chart.modify()
     .addRange(range)
     .setOption('title', 'Updated!')
     .setOption('animation.duration', 1000)
     .setPosition(2,4,0,0)
     .build();
     
    sheet.updateChart(chart);
}

function newChart() {
   var sheet = SpreadsheetApp.getActiveSheet();
   var range = sheet.getRange("A1:B8")
   var chart = sheet.getCharts()[0];
            
   sheet.removeChart(chart);
            
   chart = sheet.newChart()
     .setChartType(Charts.ChartType.BAR)
     .addRange(range)
     .setOption('title', 'Updated!')
     .setOption('animation.duration', 500)
     .setPosition(2, 4, 0, 0)
     .build();
     
    sheet.insertChart(chart);   
 }
 
 function horaActual(){
    var sheet = SpreadsheetApp.getActiveSheet();
    var value = new Date();   
    var cell = sheet.getRange("C3");
    cell.setValue(value);
 }


function createTimeDrivenTriggers() {
  // Trigger every 6 hours.
  ScriptApp.newTrigger('newChart')
      .timeBased()      
      .everyMinutes(1)
      .create();
}

/**
 * Opens a dialog. The dialog structure is described in the Dialog.html
 * project file.
 */
function showDialog() {
  var ui = HtmlService.createTemplateFromFile('Dialog')
      .evaluate()
      .setWidth(400)
      .setHeight(190);
  SpreadsheetApp.getUi().showModalDialog(ui, DIALOG_TITLE);
}
/**
 * Return current active user.
 *
 * @return {String} f address of user.
 */
function getEmailUsarioActivo() {
  var userProperties = PropertiesService.getUserProperties();
  var documentProperties = PropertiesService.getDocumentProperties();
  var session_email = Session.getEffectiveUser().getEmail();
  var properties_email = userProperties.getProperty('eMail');

   userProperties.setProperty('eMail', session_email);
   documentProperties.setProperty('eMail', properties_email);
   return userProperties.getProperty('eMail');
}

/**
 * Returns the value in the active cell.
 *
 * @return {String} The value of the active cell.
 */
function getActiveValue() {
  // Retrieve and return the information requested by the sidebar.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  return cell.getValue();
}

/**
 * Replaces the active cell value with the given value.
 *
 * @param {Number} value A reference number to replace with.
 */
function setActiveValue(value) {
  // Use data collected from sidebar to manipulate the sheet.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  cell.setValue(value);
}

/**
 * Executes the specified action (create a new sheet, copy the active sheet, or
 * clear the current sheet).
 *
 * @param {String} action An identifier for the action to take.
 */
function modifySheets(action) {
  // Use data collected from dialog to manipulate the spreadsheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var currentSheet = ss.getActiveSheet();
  if (action == "create") {
    ss.insertSheet();
  } else if (action == "copy") {
    currentSheet.copyTo(ss);
  } else if (action == "clear") {
    currentSheet.clear();
  }
}

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

/*
*Función para cargar las celdas del spreadsheet
*/
//function doGet() {
//   var app = UiApp.createApplication();
//  
//   // Create some long content.
//   var vertical = app.createVerticalPanel();
//   for (var i = 0; i < 100; ++i) {
//     vertical.add(app.createButton("button " + i));
//   }
//   var scroll = app.createScrollPanel().setPixelSize(100, 100);
//   scroll.add(vertical);
//   app.add(scroll);  
//   return app;
// }
