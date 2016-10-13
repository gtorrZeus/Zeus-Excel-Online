function UpdateInfoDesign(esquema, basedatos, servidor, filename, imagename) {
    try
    {
        var files = DriveApp.getFilesByName(filename);
        if(files.hasNext()) {
          var file = files.next();
          var fileName = file.getName();
          var ssID = file.getId();
        }
        var image = DriveApp.getFilesByName(imagename).next();
        var imageType = image.getMimeType();
        
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
      var imgBytes = image.getBlob().getAs(imageType).getBytes();
      var imgEncode = Utilities.base64Encode(imgBytes);
      var query = "EXEC [Zeus®ExcelSp_InfoDesign_Online] @Op='U', @vchNombreArchivo='"+fileName+"', @vchUsuario='"+Usuario+"', @vchFileDesignOnline='"+encoded+"', @vchImagenOnline='"+imgEncode+"', @btIsPanelOnline='1'";
      var res = ejecutar_Query(query,Usuario,servidor,basedatos,esquema);
  }
  catch(e)
  {
     ErrorLog(e.message, e.fileName, e.lineNumber);
     Browser.msgBox('Error', 'Error: '+e.message, Browser.Buttons.OK);
  }
}

function UploadBooktoDrive(filename, bytes){
   try
   {
     var uploadFile =  JSON.parse(UrlFetchApp.fetch(
          "https://www.googleapis.com/upload/drive/v2/files?uploadType=media&convert=true", 
          {
            method: "POST",
            contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            payload: bytes,
            headers: {
              "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
            },
            muteHttpExceptions: true
      }).getContentText());
      var file = DriveApp.getFileById(uploadFile.id).setName(filename);
      MoveFileToFolder(file, ZEUSEXCEL.root);
   }
   catch(e)
   {
     ErrorLog(e.message, e.fileName, e.lineNumber);
     Browser.msgBox('Error', 'Error: '+e.message, Browser.Buttons.OK);
   }
}

function UploadIconToDrive(filename, bytes){
   try
   {
     var uploadFile =  JSON.parse(UrlFetchApp.fetch(
          "https://www.googleapis.com/upload/drive/v2/files?uploadType=media", 
          {
            method: "POST",
            contentType: "image/png",
            payload: bytes,
            headers: {
              "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
            },
            muteHttpExceptions: true
      }).getContentText());
      var img = DriveApp.getFileById(uploadFile.id).setName(filename);
      MoveFileToFolder(img, ZEUSEXCEL.resources);
   }
   catch(e)
   {
     ErrorLog(e.message, e.fileName, e.lineNumber);
     Browser.msgBox('Error', 'Error: '+e.message, Browser.Buttons.OK);
   }  
}

function getIdFromFile(fileName){
  try
  {
    var file, files = DriveApp.getFilesByName(fileName);
    if(files.hasNext())
    {
      file = files.next();
      return file.getId();
    }
    else
    {
      Browser.msgBox('Error', 'Error: No se econtro el archivo con el nombre '+fileName, Browser.Buttons.OK);
    }
  }
  catch(e)
  {
    ErrorLog(e.message, e.fileName, e.lineNumber);
    Browser.msgBox('Error', 'Error: '+e.message, Browser.Buttons.OK); 
  }
}
//For checking if a string is empty, null or undefined
function isEmptyOrNull_(str) {
    return (!str || 0 === str.length);
}
//For checking if a string is blank, null or undefined
function isBlankOrNull_(str) {
    return (!str || /^\s*$/.test(str));
}
//For checking if a string is blank or contains only white-space
function isBlankOrSpaces_(str) {
    return (str.length === 0 || !str.trim());
};
//Replace string if this is null or undefined for replace value, else do nothing
function isNull_(str, replace) {
  return isEmptyOrNull_(str) ? replace : str;
}
//Test if string is an email address
function isEmail_(emailAddress) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailAddress);
}
//Verify if string is undefined
function isUndefined_(item) {
  return typeof item === 'undefined';
}

function NewFolderZeus(){
  try
  {
    var folder, folders = DriveApp.getFoldersByName(ZEUSEXCEL.root);
    /* Find the folder, create if the folder does not exist */
    if (folder.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(ZEUSEXCEL.root).createFolder(ZEUSEXCEL.resources);
    }
  }
  catch(e)
  {
     ErrorLog(e.message, e.fileName, e.lineNumber);
     Browser.msgBox('Error', 'Error: '+e.message, Browser.Buttons.OK);
  }
}

function ErrorLog(descripcion, archivo, linea) {
  var ErrorFile, ErrorFiles = DriveApp.getFilesByName("ErrorLog");
  if(!ErrorFiles.hasNext())  ErrorFile = SpreadsheetApp.create("ErrorLog");
  else ErrorFile = ErrorFiles.next();
  var idFile = ErrorFile.getId();
  var ErrorSSheet = SpreadsheetApp.openById(idFile);
  var ErrorSheet = ErrorSSheet.getSheetByName("Errors");
  if(ErrorSheet == null){ 
    ErrorSheet = ErrorSSheet.getActiveSheet().setName("Errors").activate();
    var cell = ErrorSheet.getRange('A1');
    cell.offset(0, 0).setValue("Numero error");
    cell.offset(0, 1).setValue("Descripción");
    cell.offset(0, 2).setValue("Archivo");
    cell.offset(0, 3).setValue("Numero de Linea");
    cell.offset(0, 4).setValue("Fecha");
    for(var i = 1; i<6; i++)
    {
      if(i == 5)ErrorSheet.setColumnWidth(i, 300);
      else if(i != 1) ErrorSheet.setColumnWidth(i, 200);
    }
  }
  lastRow = ErrorSheet.getLastRow();
  var formattedDate = Utilities.formatDate(new Date(), "GMT-05:00", "EEE, d MMM yyyy HH:mm:ss Z");
  var cell = ErrorSheet.getRange('A1');
  counter(ErrorSSheet);
  cell.offset(lastRow, 1).setValue(descripcion);
  cell.offset(lastRow, 2).setValue(archivo);
  cell.offset(lastRow, 3).setValue(linea);
  cell.offset(lastRow, 4).setValue(formattedDate); 
}

function EncriptarTxt_(texto, type){
  try
  {
    var blob, encode;
    if(!isEmptyOrNull_(type))
    { 
      blob = Utilities.newBlob(texto, type);
    }
    else 
    {
      blob = Utilities.newBlob(texto);
    }
    encode = Utilities.base64EncodeWebSafe(blob.getBytes());
    return encode;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function DesencriptarTxt_(texto){
  try
  {
    var encoded = Utilities.base64DecodeWebSafe(texto);
    var decoded = Utilities.newBlob(encoded).getDataAsString();
    return decoded;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function counter(ErrorSSheet) {
  try
  {
    //Get the spreadsheet, range, and value of first cell in range
    var sSheet = ErrorSSheet.getSheetByName("Errors");
    var ssRange = sSheet.getRange(1,1,1,1);
    var ssValue = ssRange.getValue();
  
    //will set value of first cell to 1 if null, undefined, false, 0, NAN etc.. (runs in if statement)
    var setOne = ssRange.setValue(1);  
  
    if (!ssValue) {
    setOne;
    }
    else {
  
    //This goes back and get the range, lastrow of range, and value of first cell in range of last row & adds 1 to that value
    var lastRow = sSheet.getLastRow();
    var startValue = sSheet.getRange(lastRow,1,1,1).getValue();
    var setLast = sSheet.getRange(lastRow+1,1,1,1).setValue(startValue + 1); 
      setLast;
    }
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function FileExistsInFolder(folderName, fileName){  
  try
  {
    var estado = false;
    var folders = DriveApp.getFoldersByName(folderName);
    if(folders.hasNext())
    {
      var folder = folders.next();
      var contents = folder.getFiles();
      while(contents.hasNext())
      {
        var file = contents.next();
         if(fileName == file.getName())
         {
           estado = true;
         }
      }
    }
    return estado;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function MoveFileToFolder(file, folderName){  
  try
  {
    var folder, folders = DriveApp.getFoldersByName(folderName);
    if(folders.hasNext())
    {
      folder = folders.next();
      file.makeCopy(folder).setName(file.getName());
      file.setTrashed(true);
    }
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function getIdFromUrl(url) { 
return url.match(/[-\w]{25,}/); 
}


