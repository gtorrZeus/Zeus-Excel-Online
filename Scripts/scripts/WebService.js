/**
 * handles storing.retrieving app properties
 * @namespace Wservice
 */
var Wservice = (function (server) {
  'use strict';
  var ns = server;
  
  server.globals={
    url: "http://www.zeustecnologia.com/ZeusCommunicationWsCentralOffline/ServiceWS.asmx?wsdl",
    user: "zeussql",
  };
  
  server.procesos = {
    funciones: "EjecutaFuncionZeusExcel",
    procedimientos: "EjecutaProcedimientoZeusExcel",
  };
  
  server.ejecutar_Query = function (query,usuario,servidor,baseDatos,esquema) {
    var sessionId = server.getSessionIdToken_(); 
    var retorno = server.getDataTableProcedimientos_(sessionId, query, usuario, Utils.fixDef(servidor,''), Utils.fixDef(baseDatos,''), Utils.fixDef(esquema,''));  
    server.getClosedSessionIDToken_();
    //retorno la matriz
    return retorno;
  };
  
  server.ejecutar_funcion = function(nombre_Funcion, nombre_Parametros, valores_Parametros, usuario, servidor, baseDatos, esquema){
    var sessionId = server.getSessionIdToken_(); 
    var retorno = server.getDataTableFuncion_(sessionId, nombre_Funcion, nombre_Parametros, valores_Parametros, usuario, servidor, baseDatos, esquema); 
    server.getClosedSessionIDToken_();
    //retorno la matriz
    return retorno;
  };
  
  server.rango_celdas_ = function(nombre,celdas){
    var etiqueta_inicio =  "@#" + nombre + "#@";
    var etiqueta_cierre =  "@#/" + nombre + "#@";
    return etiqueta_inicio + server.Concatenar_rango(celdas) + etiqueta_cierre; 
  };
  
  server.Concatenar_rango_ = function(input) {
    if (input.map) {            
        return input.map(server.Concatenar_rango_);         
    } else {
        return input;
    }
  };
  
  server.rango_parametros = function(parametros){
      var cadena = "";
      var etiqueta_inicio =  "@#Valores_Parametros#@";
      var etiqueta_cierre =  "@#/Valores_Parametros#@";
          
      var cantidad_filas = parametros.length
      
      for (var i = 0; i < cantidad_filas; i++) {
          cadena = cadena + parametros[i];
      }    
      return etiqueta_inicio + cadena + etiqueta_cierre;
  };
  
  server.getDataTableFuncion_ = function(sessionId, Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario, Servidor, BaseDatos, Esquema) {  
    var xml_accion = "<![CDATA["
                        +"<zeus>"
                            +"<parameters>"
                                +"<Nombre_Funcion>"+Nombre_Funcion+"</Nombre_Funcion>"
                                +"<Nombre_Parametros>"+Nombre_Parametros+"</Nombre_Parametros>"
                                +"<Valores_Parametros>"+Valores_Parametros+"</Valores_Parametros>"
                                +"<Usuario>"+Usuario+"</Usuario>"
                                +"<email>"+Props.getEmail()+"</email>"
                                //+"<email>"+documentProperties.getProperty('eMail')+"</email>"
                                +"<Servidor>"+Servidor+"</Servidor>"
                                +"<BaseDatos>"+BaseDatos+"</BaseDatos>"
                                +"<Esquema>"+Esquema+"</Esquema>"
                            +"</parameters>"
                        +"</zeus>]]>";
                        
    return server.getDataTable_(sessionId, xml_accion, server.procesos.funciones);
  };
  
  server.getDataTableProcedimientos_ = function(sessionId, Query, Usuario, Servidor, BaseDatos, Esquema) {
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
    return server.getDataTable_(sessionId, xml_accion, server.procesos.procedimientos);
  };
  
  server.getDataTable_ = function(sessionId, xml_accion, proceso) {
    var datos_xml = "<StandardCommunicationSOAP xmlns=\"http://www.w3.org/XML/1998/namespace:lang\">"
                        +"<Request>"                         
                          +"<SessionID>"+sessionId+"</SessionID>"
                          +"<Action>" + proceso + "</Action>"
                          +"<Body>"+xml_accion+"</Body>"
                        +"</Request>"
                      +"</StandardCommunicationSOAP>";                           
      var xml_origen = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
                        +"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
                          +"<soap:Body>"
                            +datos_xml      
                          +"</soap:Body>"
                        +"</soap:Envelope>";                      
      var options =
          {
            "method" : "post",
            "contentType" : "text/xml;charset=utf-8",
            "payload" : xml_origen
          };              
      var xml = UrlFetchApp.fetch(server.globals.url, options);
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
                           matriz[i][j] = retorno;                  
               }        
            }                          
            return matriz;
      }
      else
      {
          throw "No hay respuesta";
      }
  };
  
  server.getSessionIdToken_ = function() {
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
      
      var xml = UrlFetchApp.fetch(server.globals.url, options);
      var xml_prueba = xml.getContentText();
      var document = XmlService.parse(xml);         
      var namespace = XmlService.getNamespace('http://schemas.xmlsoap.org/soap/envelope/'); 
      var SessionIDTokenResponse = document.getRootElement().getChild("Body", namespace).getChildren();  
      var SessionIDTokenResult =  SessionIDTokenResponse[0].getChildren();       
      var namespace = XmlService.getNamespace('http://www.w3.org/XML/1998/namespace:lang');   
      var SessionID =  SessionIDTokenResult[0].getChildren("SessionID",namespace);    
      var id = SessionID[0].getText();
      return id;
  };
  
  server.getClosedSessionIDToken_ = function() {
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
      
       UrlFetchApp.fetch(server.globals.url, options);
  };

  return server;
})(Wservice || {});



