var Usuario = "zeussql";
var html_prueba = "";

/**
 * Listado de funciones utilizadas por el usuario
 */
function Explorador_Funciones(index) {   
  try
  {
    var etiquetas = "";
    index = isNull_(index, 20);
    var user = isNull_(getPropertyUser(), Usuario);
    var aplicacion = getP_CurrentAplications();
    var query = "Exec [Zeus®ExcelSp_ConfigFuncUsu] @vchUsuario = '"+user+"', @vchAplicacion = '"+aplicacion+"', @intTop = '"+index+"'";
    var res = ejecutar_Query(query, Usuario);    
               
    for (var i = 0; i < res.length; i++) {
        var matriz = res[i]; 
        var formula =replaceAll(matriz[1].toString(),'"', '@');
        //var cantidad_columnas = matriz.length;   
        etiquetas = etiquetas + '<li class="w3-padding-4" data-funcion="'+formula+'" data-aplicacion="'+matriz[3]+'"><span class="w3-closebtn w3-margin-right w3-small-10">x</span><a href="#" class="functions-list" title="' +matriz[2] + '">'+matriz[0]+'</a></li>';
    } 
    return etiquetas;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

/**
 * Listado de funciones disponibles de zeus excel
 */
function Funciones() {   
  try
  {
    var etiquetas = "";
    var user = isNull_(getPropertyUser(), Usuario);
    var query = "Exec [Zeus®ExcelSp_Funciones] @USUARIO= '"+ user +"'";        
    var res = ejecutar_Query(query, Usuario);    
               
    for (var i = 0; i < res.length; i++) {
        var matriz = res[i];         
        var formula =replaceAll(matriz[2].toString(),'"', '@'); 
        etiquetas = etiquetas + '<option value="'+formula+'" data-app="'+matriz[3]+'" title="'+matriz[0]+'">' + matriz[1] + '</option>';                 
    } 
    return etiquetas;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function RegistrarFuncion(funcion) {   
  try
  {
    var user = isNull_(getPropertyUser(), Usuario);
    var query = "Exec [Zeus®ExcelSp_ConfigFuncUsu] @vchUsuario = '"+user+"',"
                      +"@vchAplicacion = '"+funcion.aplicacion+"',"
                      +"@vchNombre = '"+funcion.nombre+"',"
                      +"@vchFormula = '"+funcion.formula+"',"
                      +"@vchAdicional = '"+funcion.adicional+"',"
                      +"@intTop = '20'";
    ejecutar_Query(query, Usuario);
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * Listado de ARBOL BU 
*/

function ObtenerArbolBU(iden) {
  try
  {
    if(iden == '' || iden == undefined) iden=1;
    var user = isNull_(getPropertyUser(), Usuario);
    var html = "";
    var nodoraiz="";      
    var query = "Exec [Zeus®SpExcel_ArbolBU] @vchUsuario='"+user+"', @Iden= '"+ iden +"'";
    var res = ejecutar_Query(query, Usuario);            
    html = BuscarHijos(nodoraiz, res);
    var etiquetas = html;
    html_prueba = html;
    return etiquetas;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}


function BuscarHijos(nodo, arreglo){
  var html = "";
  html = '<ul>';
  for (var i = 0; i < arreglo.length; i++){
      var matriz = arreglo[i];
      if(matriz[2].toString()==nodo){
            html = html + '<li><input type="checkbox" class="open w3-check" id="'+ matriz[0] +'" /><input type="checkbox" class="seleccion w3-check" value="'+ matriz[0] +'" /><label class="w3-validate" for="'+ matriz [0] +'">'+ matriz[1] +'</label>';
            html = html + BuscarHijos(matriz[0].toString(), arreglo);
      }          
  } 
  html = html + '</ul>';
  
  if(nodo!=""){
    html = html + '</li>';
  }
  
  return html;
}

/**
 * Insert en tabla especifica
 *
 * @param valores - los checkboxes seleccionados por el usuario
 * @param email - correo electronico del usuario activo  
 */
function RegistrarBUsuario(valores, email){
  try
  {
    var query = "Exec [Zeus®SpExcel_MaestroUsuarioBU] @OP = 'I', @USUARIO= '"+ Usuario +"', @EMAIL= '"+ email +"', @LSTBU= '"+ valores + "' ";
    var res = ejecutar_Query(query, Usuario);
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

/**
 * Obtiene los Bu del email activo para seleccionarlos en el arbol
 *
 * @param email - correo electronico del usuario activo 
 * return <string> Bus del usuario
 */
function ObtenerBUsuario(email){
  try
  {
    var query = "Exec [Zeus®SpExcel_MaestroUsuarioBU] @OP = 'SBU', @EMAIL= '"+ email +"' ";
    var res = ejecutar_Query(query, Usuario);
    var bussinesUnits = res[0][0];
    var array = bussinesUnits.split(";");
    return array;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function RegistraUsuarioBU(email){
  try
  {
    if(email == undefined) email='';
    var busqueda = "Exec [Zeus®SpExcel_MaestroUsuarioBU] @OP= 'SU', @EMAIL= '"+email+"' ";
    var response = ejecutar_Query(busqueda, Usuario);
    var estado = response[0][0];
    if(isNaN(estado)) return;
    if(estado == 0)
    {
      var query = "Exec [Zeus®SpExcel_MaestroUsuarioBU] @OP= 'I', @USUARIO = '"+Usuario+"', @EMAIL= '"+email+"' ";
      var res = ejecutar_Query(query, Usuario);
    }
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}
/**
 * Consulta Libros 
 * 
 */

function ObtenerLibros(){
 try
 { 
  var etiquetas = "";
  var user = isNull_(getPropertyUser(), Usuario);
  var query = "Exec [Zeus®SpExcel_LibrosBU] @vchUsuario= '"+user+"'";
  var res = ejecutar_Query(query, Usuario);
  for (var i = 0; i < res.length; i++) {
    var matriz = res[i];         
    etiquetas = etiquetas + '<option value="'+ matriz[0] +'">'+ matriz[1] +'</option>';                 
    
  } 
  return etiquetas;
 }
 catch(err)
 {
   ErrorLog(err.message, err.fileName, err.lineNumber);
   Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
 }
}

function ActualizarLibrosPUsuario(){
try
{
  var user = isNull_(getPropertyUser(), Usuario);
  var objEmpresa = getPropertiesEnterprise();
  for(var i=0; i<objEmpresa.aplicaciones.length; i++)
  {
     var row1 = objEmpresa.aplicaciones[i];
     var servidor = row1[2];
     var basedatos = row1[4];
     var query = "Exec [Zeus®ExcelSpOnline_ListarLibrosDesigner] @VCHUSUARIO = '"+user+"'";
     //var response = ejecutar_Query(queryLibros, Usuario, servidor, basedatos);//La de abajo es de prueba
     var response = ejecutar_Query(query, Usuario, 'ZEUS43\\SQL2005', 'ContabilidadVsDesarrollo');
       for(var j=0; j<response.length; j++)
       {
         var row2 = response[j];
         var nombreLibro = row2[1];
         var bytesBook = Utilities.base64DecodeWebSafe(row2[2]);
         UploadBooktoDrive(nombreLibro, bytesBook);
         var bookId = getIdFromFile(row2[1]);//mejorar buscando en el folder de zeus
         var queryRegistro = "Exec [Zeus®ExcelSpOnline_InsertUpdtLibrosXUsuarios] @VCHUSUARIO = '"+user+"', @IDLIBRO = '"+row2[0]+"', @VCHIDGOOGLEDRIVE = '"+bookId+"'";
         ejecutar_Query(queryRegistro, Usuario, 'ZEUS43\\SQL2005', 'ContabilidadVsDesarrollo');
         //ejecutar_Query(queryRegistro, user, row1[2], row1[4]);
       } 
   }
 }
 catch(err)
 {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
 }
}

function WriteXMLOnDrive(){
 try
 {
    var user = isNull_(getPropertyUser(), Usuario);
    var queryEmpresas = "Exec [Zeus®ExcelSpOnline_ListaEmpresasUsuario] @USUARIO = '"+user+"'";
    var queryAplicaciones = "Exec [Zeus®ExcelSpOnline_ListaAplicacionesEmpresas] @USUARIO = '"+user+"'";
    var arrayEnterprise = ejecutar_Query(queryEmpresas,Usuario);
    var arrayAplications = ejecutar_Query(queryAplicaciones, Usuario);
    var arrayConnections=[['ZeusComplementos', '1.1.1.1.1', '', 'ZeusComplemetosBD', 'sa', '1420000000000000'],['ZeusComplementosSeg', '2.2.2.2.2', '', 'ZeusComplemetosBDExcel', 'sa', '00']];//Prueba
    if((arrayEnterprise.length > 0) && (arrayAplications.length > 0) && (arrayConnections.length > 0))
    SaveAsXML(arrayEnterprise, arrayAplications, arrayConnections);
    else
    Browser.msgBox('Error', 'Error: No existen empresas ni aplicaciones para el usuario '+user , Browser.Buttons.OK);
 }
 catch(err)
 {
   ErrorLog(err.message, err.fileName, err.lineNumber);
   Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
 }
}

function ObtenerLibrosPUsuario(){
  try
  {
    var html = '';
    var closeDiv = '</div>';
    var user = isNull_(getPropertyUser(), Usuario);
    var objEmpresa = getPropertiesEnterprise();
    var query = "Exec [Zeus®ExcelSpOnline_LstLibrosPanelOnline] @VCHUSUARIO = '"+user+"'";
    var headerContabilidad = '', headerInventario = '', headerNomina = '', headerHotel = '', headerMinorista = '';
    var aContabilidad = '', aInventario = '', aNomina = '', aHotel = '', aMinorista = '';
    var cContabilidad, cInventario, cNomina, cHotel, cMinorista;
    objEmpresa.aplicaciones.forEach(function(row, i, array){
    if(i === 0)/*--Condición de prueba para que sólo verifique la primera posición del array (ELIMINAR)--*/
    {
       row = array[4];/*--La única aplicación configurada es Contabilidad por esto la asignación (ELIMINAR)--*/
       var aplicacion = row[1];
       var servidor = row[2];
       var basedatos = row[4];
       switch (aplicacion) {
        case "Contabilidad":
          cContabilidad = '';
          //var response = ejecutar_Query(query, Usuario, 'ZEUS43\\SQL2005', 'ContabilidadVsDesarrollo');
          var response = ejecutar_Query(query, Usuario, servidor, basedatos);
          if(isEmptyOrNull_(headerContabilidad)){
            var imgContabilidad = "data:image/png;base64,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";
            headerContabilidad += "<div class=menu><button onclick=CollapsibleDiv('"+aplicacion+"') class='w3-padding-8 w3-btn-block w3-silver'><img class='menuimg' src='"+imgContabilidad+"'>"+aplicacion+"<span>&#9660;</span></button></div>";
            headerContabilidad += "<div id='"+aplicacion+"' class='w3-accordion-content z-child w3-animate-zoom'>";
          }
          response.forEach(function(matriz, j, array)
          {
            var urlLibro = DriveApp.getFileById(matriz[2]).getUrl();
            var bookName = DriveApp.getFileById(matriz[2]).getName();
            var libro = (bookName.indexOf('.')>0) ? bookName.substring(0, (bookName.indexOf('.'))) : bookName;
            var nombreicono = libro+".png";
            var icono = matriz[4];
            //var urlIcon = "https://googledrive.com/host/"+folderID+"/"+icon;
            aContabilidad += "<a class='w3-padding-8' href='"+urlLibro+"'><img class='img' src='data:image/png;base64,"+icono+"' alt='"+nombreicono+"' width='36' height='36'><p class='text'>"+libro+"</p></a>";
          });
          break;
        case "Inventario":
          cInventario='';
          var response = ejecutar_Query(query, Usuario, servidor, basedatos);
          if(isEmptyOrNull_(headerInventario)){
            var imgInventario = "data:image/png;base64,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";
            headerInventario += "<div class=menu><button onclick=CollapsibleDiv('"+aplicacion+"') class='w3-padding-8 w3-btn-block w3-silver'><img class='menuimg' src='"+imgInventario+"'>"+aplicacion+"<span>&#9660;</span></button></div>";
            headerInventario += "<div id='"+aplicacion+"' class='w3-accordion-content z-child w3-animate-zoom'>";
          }
          response.forEach(function(matriz, j, array)
          {
            var urlLibro = DriveApp.getFileById(matriz[2]).getUrl();
            var bookName = DriveApp.getFileById(matriz[2]).getName();
            var libro = (bookName.indexOf('.')>0) ? bookName.substring(0, (bookName.indexOf('.'))) : bookName;
            var nombreicono = libro+".png";
            var icono = matriz[4];
            aInventario += "<a class='w3-padding-8' href='"+urlLibro+"'><img class='img' src='data:image/png;base64,"+icono+"' alt='"+nombreicono+"' width='36' height='36'><p class='text'>"+libro+"</p></a>";
          });
          break;
        case "Nomina":
          cNomina='';
          var response = ejecutar_Query(query, Usuario, servidor, basedatos);
          if(isEmptyOrNull_(headerNomina)){
            var imgNomina = "data:image/png;base64,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";
            headerNomina += "<div class=menu><button onclick=CollapsibleDiv('"+aplicacion+"') class='w3-padding-8 w3-btn-block w3-silver'><img class='menuimg' src='"+imgNomina+"'>"+aplicacion+"<span>&#9660;</span></button></div>";
            headerNomina += "<div id='"+aplicacion+"' class='w3-accordion-content z-child w3-animate-zoom'>";
          }
          response.forEach(function(matriz, j, array)
          {
            var urlLibro = DriveApp.getFileById(matriz[2]).getUrl();
            var bookName = DriveApp.getFileById(matriz[2]).getName();
            var libro = (bookName.indexOf('.')>0) ? bookName.substring(0, (bookName.indexOf('.'))) : bookName;
            var nombreicono = libro+".png";
            var icono = matriz[4];
            aNomina += "<a class='w3-padding-8' href='"+urlLibro+"'><img class='img' src='data:image/png;base64,"+icono+"' alt='"+nombreicono+"' width='36' height='36'><p class='text'>"+libro+"</p></a>";
          });
          break;
        case "Hotel":
          cHotel='';
          var response = ejecutar_Query(query, Usuario, servidor, basedatos);
          if(isEmptyOrNull_(headerHotel)){
            var imgHotel = "data:image/png;base64,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";
            headerHotel += "<div class=menu><button onclick=CollapsibleDiv('"+aplicacion+"') class='w3-padding-8 w3-btn-block w3-silver'><img class='menuimg' src='"+imgHotel+"'>"+aplicacion+"<span>&#9660;</span></button></div>";
            headerHotel += "<div id='"+aplicacion+"' class='w3-accordion-content z-child w3-animate-zoom'>";
          }
          response.forEach(function(matriz, j, array)
          {
            var urlLibro = DriveApp.getFileById(matriz[2]).getUrl();
            var bookName = DriveApp.getFileById(matriz[2]).getName();
            var libro = (bookName.indexOf('.')>0) ? bookName.substring(0, (bookName.indexOf('.'))) : bookName;
            var nombreicono = libro+".png";
            var icono = matriz[4];
            aHotel += "<a class='w3-padding-8' href='"+urlLibro+"'><img class='img' src='data:image/png;base64,"+icono+"' alt='"+nombreicono+"' width='36' height='36'><p class='text'>"+libro+"</p></a>";
          });
          break;
        case "Minorista":
          cMinorista='';
          var response = ejecutar_Query(query, Usuario, servidor, basedatos);
          if(isEmptyOrNull_(headerMinorista)){
            var imgMinorista = "https://googledrive.com/host/"+folderID+"/"+ZEUSEXCEL.minorista;
            headerMinorista += "<div class=menu><button onclick=CollapsibleDiv('"+aplicacion+"') class='w3-padding-8 w3-btn-block w3-silver'><img class='menuimg' src='"+imgMinorista+"'>"+aplicacion+"<span>&#9660;</span></button></div>";
            headerMinorista += "<div id='"+aplicacion+"' class='w3-accordion-content z-child w3-animate-zoom'>";
          }
          response.forEach(function(matriz, j, array)
          {
            var urlLibro = DriveApp.getFileById(matriz[2]).getUrl();
            var bookName = DriveApp.getFileById(matriz[2]).getName();
            var libro = (bookName.indexOf('.')>0) ? bookName.substring(0, (bookName.indexOf('.'))) : bookName;
            var nombreicono = libro+".png";
            var icono = matriz[4];
            aMinorista += "<a class='w3-padding-8' href='"+urlLibro+"'><img class='img' src='data:image/png;base64,"+icono+"' alt='"+nombreicono+"' width='36' height='36'><p class='text'>"+libro+"</p></a>";
          });
          break;
        default:
          throw "La aplicación no es válida o no se encuentra definida";
      }
    }//FIN CONDICION PRUEBA
    });
    cContabilidad = (typeof cContabilidad !== 'undefined') ? cContabilidad.concat(headerContabilidad, aContabilidad, closeDiv) : null;
    cInventario = (typeof cInventario !== 'undefined') ? cInventario.concat(headerInventario, aInventario, closeDiv) : null;
    cNomina = (typeof cNomina !== 'undefined') ? cNomina.concat(headerNomina, aNomina, closeDiv) : null;
    cHotel = (typeof cHotel !== 'undefined') ? cHotel.concat(headerHotel, aHotel, closeDiv) : null;
    cMinorista = (typeof cMinorista !== 'undefined') ? cMinorista.concat(headerMinorista, aMinorista, closeDiv) : null;
    html = (!isEmptyOrNull_(cContabilidad)) ? html+cContabilidad : html;
    html = (!isEmptyOrNull_(cInventario)) ? html+cInventario : html;
    html = (!isEmptyOrNull_(cNomina)) ? html+cNomina : html;
    html = (!isEmptyOrNull_(cHotel)) ? html+cHotel : html;
    html = (!isEmptyOrNull_(cMinorista)) ? html+cMinorista : html;
    return html;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function ObtenerEmpresas(){
  try
  {
    var html = '';
    var obj = getPropertiesEnterprise();
    var arr = obj.empresas;
    arr.forEach(function (element, index, array) {
      html += "<option value = '"+ element +"'>"+ element +"</option>";
    });
    return html;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function ObtenerAplicaciones(empresa){
  try
  {
    var html = '';
    var obj = getPropertiesEnterprise();
    var apps = obj.aplicaciones;
    empresa = isNull_(empresa, apps[0][0]);
    apps.forEach(function (element, index, array) {
      if(element[0] === empresa)
      {
        html += "<button class='w3-btn-block w3-white w3-tiny-10 w3-border w3-left-align w3-padding-8'><input class='w3-radio' type='radio' name='application' value='"+element[1]+"'><label class='w3-validate'>"+element[1]+"</label><i class='material-icons w3-expand'>expand_more</i></button><div id='"+element[1]+"' class='w3-accordion-content w3-white w3-border w3-tiny-10 w3-left-align'><ul class='w3-ul' disabled><li>Servidor: "+element[2]+"</li><li>Puerto: "+element[3]+"</li><li>Base de datos: "+element[4]+"</li><li>Usuario: "+element[5]+"</li><li>Password: ****</li></ul></div>";
      }
    });
    //onclick='CollapsibleDiv(`"+element[1]+"`)'
    return html;
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}

function ActualizarConfiguraciones(){
  try
  {
    var user = isNull_(getPropertyUser(), Usuario);
    var empresa = getP_CurrentEnterprise();
    var aplicacion = getP_CurrentAplication();
    var query = "Exec [Zeus®ExcelSp_ZeusExcelAdicionarConfigUsu] @Usuario = '"+user+"', @chkEmpresa = '"+empresa+"', @chkAplicacion = '"+aplicacion+"'";
    ejecutar_Query(query, Usuario);
  }
  catch(err)
  {
    ErrorLog(err.message, err.fileName, err.lineNumber);
    Browser.msgBox('Error', 'Error: '+err.message, Browser.Buttons.OK);
  }
}







  