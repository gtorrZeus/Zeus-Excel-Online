var Zeus = (function(zeus){  

  var ns = zeus;
  
  zeus.explorador = {
    html: "",
  };
  
  zeus.Explorador_Funciones = function(index){
    index = Utils.fixDef(index, 20);
    var user_ = Props.getUsuario();
    var aplicaciones_ = Props.getAplicaciones();
    var query_ = "Exec [Zeus®ExcelSp_ConfigFuncUsu] @vchUsuario = '"+user_+"', @vchAplicacion = '"+aplicaciones_+"', @intTop = '"+index+"'";
    var res = Wservice.ejecutar_Query(query_, user_);              
    for (var i = 0; i < res.length; i++) {
        var matriz = res[i]; 
        var formula = Utils.replaceAll(matriz[1].toString(),'"', '@');
        //var cantidad_columnas = matriz.length;   
        zeus.explorador.html += '<li class="w3-padding-4" data-funcion="'+formula+'" data-aplicacion="'+matriz[3]+'"><span class="w3-closebtn w3-margin-right w3-small-10">x</span><a href="#" class="functions-list" title="' +matriz[2] + '">'+matriz[0]+'</a></li>';
    } 
    return zeus.explorador.html;
  };

return zeus;
})(Zeus || {});

