function UpdateInfoDesign2(servidor, basedatos, esquema) {    
      esquema || (esquema = "dbo");
     /**/
      basedatos = "ContabilidadVsDesarrollo";
      servidor="ZEUS43\\SQL2005";
    //------
    var files = DriveApp.getFilesByName('Zeus® Análisis Cartera Cliente');
    while (files.hasNext()) {
      var file = files.next();
      var fileName = file.getName();
      var url = file.getUrl();
      var ssID = file.getId();
    }
    var image = DriveApp.getFilesByName('Icono_Analisis_Cartera_Cliente.png').next();
    var imageType = image.getMimeType();
    var imageUrl = image.getUrl();
    var imagId = image.getId();
    
    var url = "https://docs.google.com/spreadsheets/export?"+
                                                        "id=" + ssID +
                                                        "&exportFormat=xlsx&"+
                                                        "size=0&"+
                                                        "fzr=true&"+
                                                        "portrait=false&"+
                                                        "fitw=true&"+
                                                        "gridlines=false&"+
                                                        "printtitle=true&"+
                                                        "sheetnames=true&"+
                                                        "pagenum=CENTER&"+
                                                        "attachment=true&"+
                                                        "convert=true";
                                                        
  var params = {method:"GET",headers:{"authorization":"Bearer "+ ScriptApp.getOAuthToken()}};  
  var response = UrlFetchApp.fetch(url, params).getBlob();
  var bytes = response.getBytes();
  var encoded = Utilities.base64EncodeWebSafe(bytes);
  Logger.log(encoded);
  //----------------
  var imgBytes = image.getBlob().getAs(imageType).getBytes();
  var imgEncode = Utilities.base64EncodeWebSafe(imgBytes);
  Logger.log(imgEncode);
  //----------------
  var query = "EXEC [Zeus®ExcelSp_InfoDesign_Online] @Op='I', @vchNombreArchivo='"+fileName+"', @vchUsuario='gtorr', @vchFileDesignOnline='"+encoded+"', @vchImagenOnline='"+imgEncode+"', @btIsPanelOnline='1'";
  var res = ejecutar_Query(query,Usuario,servidor,basedatos,esquema);
}

function creaCarpeta(){
  var fileName = "Zeus® Análisis Cartera Cliente";
  var busqueda = "EXEC [Zeus®ExcelSp_InfoDesign_Online] @Op='S', @vchNombreArchivo='"+fileName+"'";
  var response = ejecutar_Query(busqueda, Usuario, "", "ContabilidadVsDesarrollo");
  //fileName = response[0][1];
  var encodedxls = response[0][0];
  var encodedimg = response[0][1];
  var bytesimg = Utilities.base64DecodeWebSafe(encodedimg);
  var bytesxls = Utilities.base64DecodeWebSafe(encodedxls);
  recibe_base(fileName, bytesxls, bytesimg);
}

function recibe_base(fileName, bytesexcel, bytesimg) {
   var uploadFileExcel =  JSON.parse(UrlFetchApp.fetch(
          "https://www.googleapis.com/upload/drive/v2/files?uploadType=media&convert=true", 
          {
            method: "POST",
            contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            payload: bytesexcel,
            headers: {
              "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
            },
            muteHttpExceptions: true
      }).getContentText());
    var uploadFile = JSON.parse(UrlFetchApp.fetch(
    "https://www.googleapis.com/upload/drive/v2/files?uploadType=media", 
    {
      method: "POST",
      contentType: "image/png",
      payload: bytesimg,
      headers: {
        "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
      },
      muteHttpExceptions: true
    }
  ).getContentText());
   fileName = "Zeus® Balance General Generico2";
   var file1 = DriveApp.getFileById(uploadFile.id).setName(fileName);
   var file2 = DriveApp.getFileById(uploadFileExcel.id).setName(fileName);
   MoveFileToFolder(file1, "TESIS");
   MoveFileToFolder(file2, "TESIS");
  //Logger.log(uploadFile.alternateLink);  
}
