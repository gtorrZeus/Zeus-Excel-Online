function createZeusXml(empresas, aplicaciones, conexiones){
 try
 {
  if(empresas instanceof Array && aplicaciones instanceof Array && conexiones instanceof Array){
    var Root = XmlService.createElement('ZEUSXML');
    var Configuration = XmlService.createElement('Configuration');
    var ZeusComplementos = XmlService.createElement('ZeusComplementos');
    for (var i = 0; i < empresas.length; i++){
      var Enterprise = XmlService.createElement('Enterprise')
          .setAttribute('id', empresas[i]);
        for(var j = 0; j < aplicaciones.length; j++){
          var matriz = aplicaciones[j];
          if(matriz[0] == empresas[i]){
            var Aplication = XmlService.createElement('Application')
                .setAttribute('key', matriz[1]);
            var Server = XmlService.createElement('Server')
                .setAttribute('key', 'Server')
                .setAttribute('value', matriz[2]);
            var Puerto = XmlService.createElement('Puerto')
                .setAttribute('key', 'Puerto')
                .setAttribute('value', matriz[3]);
            var DataBase = XmlService.createElement('DataBase')
                .setAttribute('key', 'DataBase')
                .setAttribute('value', matriz[4]);
            var User = XmlService.createElement('User')
                .setAttribute('key', 'User')
                .setAttribute('value', matriz[5]);
            var Password = XmlService.createElement('Password')
                .setAttribute('key', 'Password')
                .setAttribute('value', matriz[6]);
            Aplication.addContent(Server);
            Aplication.addContent(Puerto);
            Aplication.addContent(DataBase);
            Aplication.addContent(User);
            Aplication.addContent(Password);
            Enterprise.addContent(Aplication);
          }
        }
      Configuration.addContent(Enterprise);
    }
    for (var c = 0; c < conexiones.length; c++){
     var array = conexiones[c];
     var Conexion = XmlService.createElement('Conexion')
       .setAttribute('id', array[0]);
     var Server = XmlService.createElement('Server')
       .setAttribute('key', 'Server')
       .setAttribute('value', array[1]);
     var Puerto = XmlService.createElement('Puerto')
       .setAttribute('key', 'Puerto')
       .setAttribute('value', array[2]);
     var DataBase = XmlService.createElement('DataBase')
       .setAttribute('key', 'DataBase')
       .setAttribute('value', array[3]);
     var User = XmlService.createElement('User')
       .setAttribute('key', 'User')
       .setAttribute('value', array[4]);
     var Password = XmlService.createElement('Password')
       .setAttribute('key', 'Password')
       .setAttribute('value', array[5]);
     Conexion.addContent(Server);
     Conexion.addContent(Puerto);
     Conexion.addContent(DataBase);
     Conexion.addContent(User);
     Conexion.addContent(Password);
     ZeusComplementos.addContent(Conexion);
    }
   Root.addContent(Configuration);
   Root.addContent(ZeusComplementos);
   var document = XmlService.createDocument(Root);
   var xml = XmlService.getPrettyFormat().format(document);
   return xml;
  }else{
    Browser.msgBox("Error", "Verifíque los parámetros para crear el archivo de empresas", Browser.Buttons.OK);
  }
 }
 catch(err)
 {
   ErrorLog(err.message, err.fileName, err.lineNumber);
   Browser.msgBox("Error", "Error: "+err.message+".", Browser.Buttons.OK);
 }
}

function SaveAsXML(empresas, aplicaciones, conexiones){
 try
 {
  var fileName = ZEUSEXCEL.empresas;
  if (fileName.length !== 0 && empresas.length > 0 && aplicaciones.length > 0) {
    var xmlFile = createZeusXml(empresas, aplicaciones, conexiones);
    xmlFile = EncriptarTxt_(xmlFile, 'text/xml');
    DriveApp.createFile(fileName, xmlFile, 'text/xml');//Falta por definir la carpeta donde estará este archivo
  }
  else {
    Browser.msgBox("Error", "Error: Error al intentar guardar el archivo de empresas.", Browser.Buttons.OK);
  }
 }
 catch(err)
 {
   ErrorLog(err.message, err.fileName, err.lineNumber);
   Browser.msgBox("Error", "Error: "+err.message+".", Browser.Buttons.OK);
 }
}

function ReadXML(){
 try
 {
  var empresas = [];
  var aplicaciones = [];
  var connections = [];
  var file = DriveApp.getFilesByName(ZEUSEXCEL.empresas).next().getAs('text/xml');
  var encodetxt = file.getDataAsString();
  var xml = DesencriptarTxt_(encodetxt);
  var document = XmlService.parse(xml);
  Logger.log(xml);
  var root = document.getRootElement();
  var configuration = root.getChild('Configuration');
  var zeuscomplementos = root.getChild('ZeusComplementos');
  var enterprises = configuration.getChildren('Enterprise');
  var conexiones = zeuscomplementos.getChildren('Conexion');
  for(var i=0; i<enterprises.length; i++){
    var nombreEmpresa = enterprises[i].getAttribute('id').getValue();
    empresas.push(nombreEmpresa);
    var aplications = enterprises[i].getChildren('Application');
    for(var j=0; j<aplications.length; j++){
      var app = aplications[j].getAttribute('key').getValue();
      var server = aplications[j].getChild('Server').getAttribute('value').getValue();
      var puerto = aplications[j].getChild('Puerto').getAttribute('value').getValue();
      var bd = aplications[j].getChild('DataBase').getAttribute('value').getValue();
      var user = aplications[j].getChild('User').getAttribute('value').getValue();
      var password = aplications[j].getChild('Password').getAttribute('value').getValue();
      aplicaciones.push([nombreEmpresa, app, server, puerto, bd, user, password]);
    }
  }
  for(var i=0; i<conexiones.length; i++){
    var name = conexiones[i].getAttribute('id').getValue();
    var server = conexiones[i].getChild('Server').getAttribute('value').getValue();
    var puerto = conexiones[i].getChild('Puerto').getAttribute('value').getValue();
    var bd = conexiones[i].getChild('DataBase').getAttribute('value').getValue();
    var user = conexiones[i].getChild('User').getAttribute('value').getValue();
    var password = conexiones[i].getChild('Password').getAttribute('value').getValue();
    connections.push([name, server, puerto, bd, user, password]);
  }
  setPropertiesEnterprise(empresas, aplicaciones, connections);
 }
 catch(err)
 {
   ErrorLog(err.message, err.fileName, err.lineNumber);
   Browser.msgBox("Error", "Error: "+err.message+".", Browser.Buttons.OK);
 }
}
