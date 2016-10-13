var url = "http://www.zeustecnologia.com/ZeusCommunicationWsCentralOffline/ServiceWS.asmx?wsdl"; 
var Usuario = "zeussql";


function ejecutar_Query(Query, Usuario, Servidor, BaseDatos, Esquema){
  try
  {
   //inicio de sesion en el servidor
    var sessionId = getSessionIdToken_(); 
    //ejecuto la funcion indicada
    var retorno = getDataTableProcedimientos_(sessionId, Query, Usuario, isNull_(Servidor,''), isNull_(BaseDatos,''), isNull_(Esquema,''));  
    //cierro la sesion del servidor
    getClosedSessionIDToken_();
    //retorno la matriz
    return retorno;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario, Servidor, BaseDatos, Esquema){
  try
  {
   if(Servidor == undefined) Servidor = '';
   if(BaseDatos == undefined) BaseDatos = '';
   if(Esquema == undefined) Esquema = '';
   //inicio de sesion en el servidor
    var sessionId = getSessionIdToken_(); 
    //ejecuto la funcion indicada
    var retorno = getDataTableFuncion_(sessionId, Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario, Servidor, BaseDatos, Esquema);  
    //cierro la sesion del servidor
    getClosedSessionIDToken_();
    //retorno la matriz
    return retorno;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function rango_celdas_(nombre,celdas){
    var etiqueta_inicio =  "@#" + nombre + "#@";
    var etiqueta_cierre =  "@#/" + nombre + "#@";
    return etiqueta_inicio + Concatenar_rango_(celdas) + etiqueta_cierre; 
}

function Concatenar_rango_(input) {
    if (input.map) {            
        return input.map(Concatenar_rango_);         
    } else {
        return input;
    }
}

function rango_parametros_(parametros){
    var cadena = "";
    var etiqueta_inicio =  "@#Valores_Parametros#@";
    var etiqueta_cierre =  "@#/Valores_Parametros#@";
        
    var cantidad_filas = parametros.length
    
    for (var i = 0; i < cantidad_filas; i++) {
        cadena = cadena + parametros[i];
    }    
    return etiqueta_inicio + cadena + etiqueta_cierre;
}

/**
 * Ejecuta Querys de funciones
 *
 * @param {number} 
 * @return Retorna valor
 * @customfunction
 */
function getDataTableFuncion_(sessionId, Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario, Servidor, BaseDatos, Esquema) {
  try
  {
    var proceso =  "EjecutaFuncionZeusExcel"   
       
    var xml_accion = "<![CDATA["
                        +"<zeus>"
                            +"<parameters>"
                                +"<Nombre_Funcion>"+Nombre_Funcion+"</Nombre_Funcion>"
                                +"<Nombre_Parametros>"+Nombre_Parametros+"</Nombre_Parametros>"
                                +"<Valores_Parametros>"+Valores_Parametros+"</Valores_Parametros>"
                                +"<Usuario>"+Usuario+"</Usuario>"
                                +"<email>"+getOwnerEmail()+"</email>"
                                //+"<email>"+documentProperties.getProperty('eMail')+"</email>"
                                +"<Servidor>"+Servidor+"</Servidor>"
                                +"<BaseDatos>"+BaseDatos+"</BaseDatos>"
                                +"<Esquema>"+Esquema+"</Esquema>"
                            +"</parameters>"
                        +"</zeus>]]>";
                        
    return getDataTable_(sessionId, xml_accion, proceso);
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
 }

/**
 * Ejecuta Querys o procedimientos
 *
 * @param {number} 
 * @return Retorna valor
 * @customfunction
 */
function getDataTableProcedimientos_(sessionId, Query, Usuario, Servidor, BaseDatos, Esquema) {
  try
  {
    var proceso =  "EjecutaProcedimientoZeusExcel"
     
    var xml_accion = "<![CDATA["
                        +"<zeus>"
                            +"<parameters>"
                                +"<Query>"+Query+"</Query>"                                
                                +"<Usuario>"+Usuario+"</Usuario>"
                                +"<Servidor>"+Servidor+"</Servidor>"
                                +"<BaseDatos>"+BaseDatos+"</BaseDatos>"
                                +"<Esquema>"+Esquema+"</Esquema>"
                            +"</parameters>"
                        +"</zeus>]]>";
    return getDataTable_(sessionId, xml_accion, proceso);
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
 }
 
 /**
 * Ejecuta Querys de funciones
 *
 * @param {number} 
 * @return Retorna valor
 * @customfunction
 */
function getDataTable_(sessionId, xml_accion, proceso) {
  try
  {
    var datos_xml = "<StandardCommunicationSOAP xmlns=\"http://www.w3.org/XML/1998/namespace:lang\">"
                        +"<Request>"                         
                          +"<SessionID>"+sessionId+"</SessionID>"
                          +"<Action>" + proceso + "</Action>"
                          +"<Body>"+xml_accion+"</Body>"
                        +"</Request>"
                      +"</StandardCommunicationSOAP>";      
                      
      //"<?xml version=\"1.0\" encoding=\"utf-8\"?>"       "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>"        
      var xml_origen = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
                        +"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
                          +"<soap:Body>"
                            +datos_xml      
                          +"</soap:Body>"
                        +"</soap:Envelope>";     
      Logger.log(xml_origen);                  
      var options =
          {
            "method" : "post",
            "contentType" : "text/xml;charset=utf-8",
            "payload" : xml_origen
          };              
     
      var xml = UrlFetchApp.fetch(url, options);
      Logger.log(xml); 
        
      /*
      if (xml == "") {
         Logger.log ("Respuesta en blanco - Inténtalo de nuevo lo hará 1 seg sueño");
         // respuesta var = UrlFetchApp.fetch (url);
         Utilities.sleep (2.000)
         Logger.log (respuesta);
      }
      */
      
      if (xml.getResponseCode() == 200)
      {
            var xml_prueba = xml.getContentText();
            var document = XmlService.parse(xml);      
            var namespace = XmlService.getNamespace('http://schemas.xmlsoap.org/soap/envelope/'); 
            var StandardCommunicationSOAPResponse = document.getRootElement().getChild("Body", namespace).getChildren();  
            var StandardCommunicationSOAPResult =  StandardCommunicationSOAPResponse[0].getChildren();       
            var namespace = XmlService.getNamespace('http://www.w3.org/XML/1998/namespace:lang');   
            var Body =  StandardCommunicationSOAPResult[0].getChildren("Body",namespace); 
            var strXmlBody = Body[0].getText();
            var XmlBody = XmlService.parse(strXmlBody);
            var entries = XmlBody.getRootElement().getChildren("item");
            
        
            var cantidad_filas = entries.length;                  
            var matriz = new Array(cantidad_filas);
            
            for (var i = 0; i < cantidad_filas; i++) {
               var columnas = entries[i].getChildren(); 
               var cantidad_columnas = columnas.length;              
               
               matriz[i] = new Array(cantidad_columnas);
               
               for (var j = 0; j < cantidad_columnas; j++) {                        
                     var retorno = columnas[j].getText();                                                           
                     var tipo = parseInt(retorno);                      
                     //if (isNaN(tipo)) {
                           matriz[i][j] = retorno;
                     //}
                     //else{
                       //    matriz[i][j] = parseInt(retorno);
                     //}                     
               }        
            }                          
            return matriz;
      }
      else
      {
          return "no hay respuesta";
      }
      
      var recipient = Session.getActiveUser().getEmail();
      var subject = 'Lista de errores';
      var body = Logger.getLog();
      MailApp.sendEmail(recipient, subject, body);
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
 }
 
 /**
 * Obtener el token de session
 *
 * @param {number} 
 * @return Retorna valor xml 
 */
function getSessionIdToken_() {
    try
    {
      var xml_origen =  "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
                        +"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
                          +"<soap:Body>"
                            +"<SessionIDToken xmlns=\"http://www.w3.org/XML/1998/namespace:lang\">"
                              +"<Request>"
                                +"<TypeSQL>false</TypeSQL>"
                                +"<DynamicProperty>?</DynamicProperty>"
                                +"<SessionID>?</SessionID>"
                                +"<Action>?</Action>"
                                +"<Body>"
                                  +"<![CDATA[<generatortoken> <security user=\"ZeusExcel\" password=\"qaz112qaz\" /> </generatortoken>]]>"
                                +"</Body>"
                              +"</Request>"
                            +"</SessionIDToken>"
                          +"</soap:Body>"
                        +"</soap:Envelope>";      
       var options =
          {
            "method" : "post",
            "contentType" : "text/xml",
            "payload" : xml_origen
          };  
      
      var xml = UrlFetchApp.fetch(url, options);
      var xml_prueba = xml.getContentText();
      var document = XmlService.parse(xml);         
      var namespace = XmlService.getNamespace('http://schemas.xmlsoap.org/soap/envelope/'); 
      var SessionIDTokenResponse = document.getRootElement().getChild("Body", namespace).getChildren();  
      var SessionIDTokenResult =  SessionIDTokenResponse[0].getChildren();       
      var namespace = XmlService.getNamespace('http://www.w3.org/XML/1998/namespace:lang');   
      var SessionID =  SessionIDTokenResult[0].getChildren("SessionID",namespace);    
      var id = SessionID[0].getText();
      return id;
    }
    catch(err)
    {
      ErrorLog(err.message, err.fileName, err.lineNumber);
      Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
    }
 }
 
 /**
 * Cerrar el token de session
 *
 * @param {number} 
 * @return Retorna valor xml 
 */
function getClosedSessionIDToken_() {
    try
    {
      var xml_origen =  "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
                        +"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
                          +"<soap:Body>"
                            +"<ClosedSessionIDToken  xmlns=\"http://www.w3.org/XML/1998/namespace:lang\">"
                              +"<Request>"
                                +"<TypeSQL>false</TypeSQL>"
                                +"<DynamicProperty>string</DynamicProperty>"
                                +"<SessionID>?</SessionID>"
                                +"<Action>?</Action>"
                                +"<Body>"
                                  +"<![CDATA[<generatortoken> <security user=\"ZeusExcel\" password=\"qaz112qaz\" /> </generatortoken>]]>"
                                +"</Body>"
                              +"</Request>"
                            +"</ClosedSessionIDToken >"
                          +"</soap:Body>"
                        +"</soap:Envelope>";      
       var options =
          {
            "method" : "post",
            "contentType" : "text/xml",
            "payload" : xml_origen
          };  
      
      var xml = UrlFetchApp.fetch(url, options);
      var xml_prueba = xml.getContentText();
    }
    catch(err)
    {
      ErrorLog(err.message, err.fileName, err.lineNumber);
      Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
    }      
}
 
/**
 * Ejecuta Querys
 *
 * @param {number} 
 * @return Retorna valor xml 
 */
 function crearTrigger_() {
  // Trigger every 6 hours.
  ScriptApp.newTrigger('newGrafico_')
      .timeBased()      
      .everyMinutes(1)
      .create();
}

/**
 * Crear grafico
 *
 */
function newGrafico_() {
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
