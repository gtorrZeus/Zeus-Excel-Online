var Usuario = "zeussql";
//documentProperties.setProperty('Fecha', '2015/08/30');

/**
 * Fecha del informe actual. Se puede modificar en el panel de información del sistema
 * @return {Date} La fecha del documento actual.
 * @customfunction
 */
function FechaInformeNumero() { 
   if(isEmptyOrNull_(getPropertyFechaInforme()))
   {
     setPropertyFechaInforme(FechaCorteNumero());
   }
   return getPropertyFechaInforme();
}


/**
 * Indica la fecha de informe en formato alfanumérico. Se puede modificar en el panel de información del sistema
 * @return {String} Fecha del documento en formato alfanumérico
 * @customfunction
*/
function FechaInformeLetra() {    
   var fechaInformeN = FechaInformeNumero();
   var month = fechaInformeN.substring(5, 7);
   month = NameMes(month);
   fechaInformeN = month +" "+ fechaInformeN.substring(8, fechaInformeN.length) +" de "+ fechaInformeN.substring(0,4);
   return fechaInformeN;
}

/**
 * Indica la fecha de corte del informe en formato numérico
 * @return {Number} fecha de corte informe Numero
 * @customfunction
 */
function FechaCorteNumero() {    
  var query = "Exec [Zeus®ExcelSp_FechaCorteNumero]";
  var res = ejecutar_Query(query, Usuario);
  var FechaCorteNumero = res[0][0];
  return FechaCorteNumero;
}

/**
 * Indica la fecha de corte del informe en formato alfanumérico
 * @return {String} fecha de corte informe Texto
 * @customfunction
 */
function FechaCorteLetra(){
  var query = "Exec [Zeus®ExcelSp_FechaCorteLetra]";
  var res = ejecutar_Query(query, Usuario);
  var FechaCorteLetra = res[0][0];
  return FechaCorteLetra;
}

/**
 * Convierte la fecha digitada desde formato "YYYY/MM/DD" a texto
 * @param {Date} Fecha en formato "YYYY/MM/DD"
 * @return {String} Fecha en letras
 * @customfunction
*/

function FechaLetra(fecha) {
  fecha || ( fecha = "YYYY/MM/DD" );
  if(fecha == "YYYY/MM/DD"){
    return "Digite fecha válida en formato YYYY/MM/DD";
  }else if(!isDate_(fecha)){
    return"Digite fecha válida en formato YYYY/MM/DD";
  }else{
    var query = "Exec [Zeus®ExcelSp_FechaLetra] @FECHA = '"+ fecha +"'";
    var res = ejecutar_Query(query, Usuario);
    var FechaLetra = res[0][0];
    return FechaLetra;
  }  
}

/**
 * Muestra la representación numérica de la fecha digitada
 * @param {"1999/01/01"} fecha en formato YYYY/MM/DD
 * @customfunction
*/

function FechaNumeros(fecha) {
  fecha || ( fecha = "YYYY/MM/DD" );
  if(fecha == "YYYY/MM/DD"){
    return "Digite fecha válida en formato YYYY/MM/DD";
  }else if(!isDate_(fecha)){
    return"Digite fecha válida en formato YYYY/MM/DD";
  }else{
    var fechas;
    var Nombre_Funcion = "FechaNumeros";
    var Nombre_Parametros = ["fecha"];
    
    //los rangos de las celdas seleccionadas
    fechas = rango_celdas_("fecha",fecha);
    
    var Valores_Parametros = rango_parametros_([fechas]);
    var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
    retorno = parseInt(retorno[0][0], 10);
    return retorno.toFixed();
  }  
}

//Validador Fecha YYYY/MM/DD
function isDate_(txtDate)
{
    var currVal = txtDate;
    if(currVal == '')
        return false;
    
    var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/; //Declare Regex
    var dtArray = currVal.match(rxDatePattern); // is format OK?
    
    if (dtArray == null) 
        return false;
    
    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[3];
    dtDay= dtArray[5];
    dtYear = dtArray[1];        
    
    if (dtMonth < 1 || dtMonth > 12) 
        return false;
    else if (dtDay < 1 || dtDay> 31) 
        return false;
    else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) 
        return false;
    else if (dtMonth == 2) 
    {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay> 29 || (dtDay ==29 && !isleap)) 
                return false;
    }
    return true;
}

/**
 * Nombre del mes relativo al periodo especificado
 * @param {Number} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {String} Nombre del mes.
 * @customfunction
 */

function NameMesRelative(periodo) {
  if (isUndefined_(periodo)) return "Especifique el periodo siendo 0 el actual";
  var query = "Exec [Zeus®ExcelSp_NameMesRelative] @nmes = '"+ periodo +"' ";
  var res = ejecutar_Query(query, Usuario);
  var Mesrelativo = res[0][0];
  return Mesrelativo;
}

/**
 * Numero del mes relativo al periodo especificado
 * @param {0} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {Number} Numero del mes.
 * @customfunction
 */

function NumMesRelative(periodo) {
  if (isUndefined_(periodo)) return "Especifique el periodo siendo 0 el actual";
  var periodos;
  var Nombre_Funcion = "NumMesRelative";
  var Nombre_Parametros = ["periodo"];
  
  //los rangos de las celdas seleccionadas
  periodos = rango_celdas_("periodo",periodo);
  
  var Valores_Parametros = rango_parametros_([periodos]);
  var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
  retorno = parseInt(retorno[0][0], 10);
  return retorno.toFixed();
}

/**
 * Numero del año relativo al periodo especificado
 * @param {0} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {Number} Numero del año.
 * @customfunction
 */

function NumAnoRelative(periodo) {
  if (isUndefined_(periodo)) return "Especifique el periodo siendo 0 el actual";
  var periodos;
  var Nombre_Funcion = "NumAnoRelative";
  var Nombre_Parametros = ["periodo"];
  
  //los rangos de las celdas seleccionadas
  periodos = rango_celdas_("periodo",periodo);
  
  var Valores_Parametros = rango_parametros_([periodos]);
  var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
  retorno = parseInt(retorno[0][0], 10);
  return retorno.toFixed();
}

/**
 * Nombre del mes y numero del año relativo al periodo especificado
 * @param {0} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {String} Mes y año relativo.
 * @customfunction
 */

function NameAnoMesRelative(periodo) {
  if (isUndefined_(periodo)) return "Especifique el periodo siendo 0 el actual";
  var query = "Exec [Zeus®ExcelSp_NameAnoMesRelative] @periodo = '"+ periodo +"' ";
  var res = ejecutar_Query(query, Usuario);
  var Anomesrelativo = res[0][0];
  return Anomesrelativo;
  
}

/**
 * Numero del mes y numero del año relativo al periodo especificado
 * @param {0} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {String} Mes y año relativo (numero).
 * @customfunction
 */

function NumAnoMesRelative(periodo) {
  if (isUndefined_(periodo)) return "Especifique el periodo siendo 0 el actual";
  var query = "Exec [Zeus®ExcelSp_NumAnoMesRelative] @periodo = '"+ periodo +"' ";
  var res = ejecutar_Query(query, Usuario);
  var Anomesrelativo = res[0][0];
  return Anomesrelativo;
}

/**
 * Día Relativo en Números 
 * @param {"Letras"} "Letras" Para mostrar el día en formato alfanumérico
 * @param {0} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {String} Día Relativo Números.
 * @customfunction
 */

function NumDiaRelative(tipo, periodo) {
  if (isUndefined_(periodo)) return "Especifique el periodo siendo 0 el actual";
  if (isUndefined_(tipo)) tipo = "";
  var query = "Exec [Zeus®ExcelSp_NumDiaRelative] @tipo = '"+ tipo +"', @nmes = '"+ periodo +"' ";
  var res = ejecutar_Query(query, Usuario);
  var Diarelativo = res[0][0];
  return Diarelativo; 
}

/**
 * Día relativo de la semana 
 * @param {"Español"} Idioma en el que se quiere mostrar el día 
 * @param {0} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {String} Día Relativo.
 * @customfunction
 */

function NameDiaRelative(idioma, periodo) {
  if (isUndefined_(periodo)) return "Especifique el periodo siendo 0 el actual";
  if (isUndefined_(idioma)) idioma = "";
  var query = "Exec [Zeus®ExcelSp_NameDiaRelative] @idioma = '"+ idioma +"', @nmes = '"+ periodo +"' ";
  var res = ejecutar_Query(query, Usuario);
  var Diarelativo = res[0][0];
  return Diarelativo; 
}

/**
 * Mes relativo al número especificado 1-12
 * @param {5} Ingrese un mes entre 1-12
 * @return {String} Mes Relativo.
 * @customfunction
 */

function NameMes(mes) {
  if (mes == undefined) return "Digite numero entre 1-12";
  if (mes < 1 || mes > 12) return "Digite mes válido";
  var query = "Exec [Zeus®ExcelSp_NameMes] @nmes = '"+ mes +"' ";
  var res = ejecutar_Query(query, Usuario);
  var NameMes = res[0][0];
  return NameMes; 
}

/**
 * Número de Días de un Mes
 * @param {5} Ingrese un mes entre 1-12
 * @return {Number} Días
 * @customfunction
 */

function DiasPorMes(mes) {
  if (isUndefined_(mes)) return "Digite numero entre 1-12";
  if (mes < 1 || mes > 12) return "Digite mes válido";
  
  var periodos;
  var Nombre_Funcion = "DiasPorMes";
  var Nombre_Parametros = ["periodo"];
  
  //los rangos de las celdas seleccionadas
  periodos = rango_celdas_("periodo",mes);
  
  var Valores_Parametros = rango_parametros_([periodos]);
  var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
  retorno = parseInt(retorno[0][0], 10);
  return retorno.toFixed();
}

/**
 * Convierte un Número en Letras en Español
 * @param {1500} Número a convertir
 * @param {1} Número 1-Mayúscula 2-Minúscula
 * @param {"PESOS"} Opcional Tipo de Moneda
 * @return {String} Valor en letras
 * @customfunction
 */

function NumeroaLetras(cantidad, mayus, moneda) {
  if (isUndefined_(cantidad)) return "Digite cantidad a convertir";
  var query = "Exec [Zeus®ExcelSp_NumeroaLetras] @Numero = '"+ cantidad +"'";
  query += (isUndefined_(mayus)) ? "" : ", @Mayusculas = '"+ mayus +"'";
  query += (isEmptyOrNull_(moneda)) ? "" : ", @Moneda = '"+ moneda +"'";
  var res = ejecutar_Query(query, Usuario);
  var retorno = res[0][0];
  return retorno;
}

/**
 * Convierte un Número en Letras en Inglés
 * @param {1500} Número a convertir
 * @param {"DOLLARS"} (Opcional) Tipo de Moneda 
 * @param {"Centavos"} (Opcional) Centavos o decimas
 * @param {"s"} (Opcional) Cantidad unitaria o plural 's' o 'n'
 * @return {String} Valor en letras 
 * @customfunction
 */

function NumeroaLetters(cantidad, ignored, moneda, decima, plural) {
  if (isUndefined_(cantidad)) return "Digite cantidad a convertir";
  var query = "Exec [Zeus®ExcelSp_NumLetters] @Num = '"+ cantidad +"'";
  query += (isEmptyOrNull_(moneda)) ? "" : ", @Moneda = '"+ moneda +"'";
  query += (isEmptyOrNull_(decima)) ? "" : ", @Cent = '"+ decima +"'";
  query += (isEmptyOrNull_(plural)) ? "" : ", @plural = '"+ plural +"'";
  var res = ejecutar_Query(query, Usuario);
  var retorno = res[0][0];
  return retorno; 
}

/**
 * Número de Días de un Mes Relativo 
 * @param {0} Ingrese el periodo de la cuenta, 0 es el periodo actual
 * @return {Number} Numero de días
 * @customfunction
 */

function DiasPorMesRelative(nmes) {
  if (isUndefined_(nmes)) return "Especifique el periodo siendo 0 el actual";
  var periodos;
  var Nombre_Funcion = "DiasPorMesRelative";
  var Nombre_Parametros = ["periodo"];
  
  //los rangos de las celdas seleccionadas
  periodos = rango_celdas_("periodo",nmes);
  
  var Valores_Parametros = rango_parametros_([periodos]);
  var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
  retorno = parseInt(retorno[0][0], 10);
  return retorno.toFixed();
}

/**
 * Nit de la compañia
 *
 * @return {Number} The distance in miles.
 * @function
 */
function Nit(){
  var Nombre_Funcion = "NIt";
  var Nombre_Parametros = [""];
  
  //los rangos de las celdas seleccionadas
  
  var Valores_Parametros = rango_parametros_([""]);
  var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
  return retorno; 
}

/**
 * Saldo actual de la cuenta
 *
 * @param {Number} Ingrese el codigo de la cuenta 
 * @param {periodo} Ingrese el codigo de la cuenta
 * @param {bu} Ingrese el codigo de la cuenta
 * @return {Number} The distance in miles.
 * @function
 */
function ksact(cuenta, periodo, bu) {      
    var fechas,cuentas,periodos,bus;    
    
    var Nombre_Funcion = "ksact";       
    var Nombre_Parametros = ["fecha","cuenta","periodo","bu"];

    //los rangos de las celdas seleccionadas
    fechas = rango_celdas_("fecha", getPropertyFechaInforme());//getPropertyFechaInforme());
    cuentas = rango_celdas_("cuenta",cuenta);
    periodos = rango_celdas_("periodo",periodo);
    bus = rango_celdas_("bu",bu);

    var Valores_Parametros = rango_parametros_([fechas,cuentas,periodos,bus]);           
    var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
    
    return retorno;
}

/**
 * Movimiento de la cuenta
 *
 * @param {Cuenta} cuenta Ingrese el codigo de la cuenta 
 * @param {Periodo} periodo Ingrese el codigo de la cuenta
 * @param {BU} bu Ingrese el codigo de la cuenta
 * @return {Number} The distance in miles.
 * @customfunction
 */
function Kmovp(cuenta, periodo, bu) {       
    var fechas,cuentas,periodos,bus;    
    
    var Nombre_Funcion = "Kmovp";       
    var Nombre_Parametros = ["fecha","cuenta","periodo","bu"];

    //los rangos de las celdas seleccionadas
    fechas = rango_celdas_("fecha", getPropertyFechaInforme());// ,getPropertyFechaInforme());
    cuentas = rango_celdas_("cuenta",cuenta);
    periodos = rango_celdas_("periodo",periodo);
    bus = rango_celdas_("bu",bu);

    var Valores_Parametros = rango_parametros_([fechas,cuentas,periodos,bus]);           
    var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
    
    return retorno;
}


/**
 * Movimiento de la cuenta del cliente
 *
 * @param {Cuenta} cuenta Ingrese el codigo de la cuenta 
 * @param {Cliente} cliente Ingrese el codigo de la cuenta 
 * @param {Periodo} periodo Ingrese el codigo de la cuenta
 * @param {BU} bu Ingrese el codigo de la cuenta
 * @return {Number} The distance in miles.
 * @customfunction
 */
function Ksactcli(cuenta,cliente, periodo, bu) {       
    var fechas,cuentas,clientes,periodos,bus;        
    
    var Nombre_Funcion = "Ksactcli";       
    var Nombre_Parametros = ["fecha","cuenta","cliente","periodo","bu"];

    //los rangos de las celdas seleccionadas
    fechas = rango_celdas_("fecha", getPropertyFechaInforme());//, getPropertyFechaInforme())
    cuentas = rango_celdas_("cuenta",cuenta);
    clientes = rango_celdas_("cliente",cliente);
    periodos = rango_celdas_("periodo",periodo);
    bus = rango_celdas_("bu",bu);

    var Valores_Parametros = rango_parametros_([fechas,cuentas,clientes,periodos,bus]);           
    var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
    
    return retorno;    
}

/**
 * Movimiento de la cuenta del cliente
 *
 * @param {Cuenta} cuenta Ingrese el codigo de la cuenta 
 * @param {Cliente} cliente Ingrese el codigo de la cuenta 
 * @param {Periodo} periodo Ingrese el codigo de la cuenta
 * @param {BU} bu Ingrese el codigo de la cuenta
 * @return {Number} The distance in miles.
 * @customfunction
 */
function KsactcliCorto(cuenta,cliente, periodo, bu) {       
    var fechas,cuentas,clientes,periodos,bus;        
    
    var Nombre_Funcion = "KsactcliCorto";       
    var Nombre_Parametros = ["fecha","cuenta","cliente","periodo","bu"];

    //los rangos de las celdas seleccionadas
    fechas = rango_celdas_("fecha", getPropertyFechaInforme());//, getPropertyFechaInforme());
    cuentas = rango_celdas_("cuenta",cuenta);
    clientes = rango_celdas_("cliente",cliente);
    periodos = rango_celdas_("periodo",periodo);
    bus = rango_celdas_("bu",bu);

    var Valores_Parametros = rango_parametros_([fechas,cuentas,clientes,periodos,bus]);           
    var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
    
    return retorno;
}



/**
 * Movimiento de la cuenta del cliente
 *
 * @param {Cuenta} cuenta Ingrese el codigo de la cuenta 
 * @param {Cliente} cliente Ingrese el codigo de la cuenta 
 * @param {Periodo} periodo Ingrese el codigo de la cuenta
 * @param {BU} bu Ingrese el codigo de la cuenta
 * @return {Number} The distance in miles.
 * @customfunction
 */
function KsactcliLargo(cuenta,cliente, periodo, bu) {       
    var fechas,cuentas,clientes,periodos,bus;        
    
    var Nombre_Funcion = "KsactcliLargo";       
    var Nombre_Parametros = ["fecha","cuenta","cliente","periodo","bu"];

    //los rangos de las celdas seleccionadas
    fechas = rango_celdas_("fecha", getPropertyFechaInforme());//, getPropertyFechaInforme());
    cuentas = rango_celdas_("cuenta",cuenta);
    clientes = rango_celdas_("cliente",cliente);
    periodos = rango_celdas_("periodo",periodo);
    bus = rango_celdas_("bu",bu);
    
    var Valores_Parametros = rango_parametros_([fechas,cuentas,clientes,periodos,bus]);           
    
    var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
    
    return retorno;
}


/**
 * Movimiento de la cuenta del cliente
 *
 * @param {Cuenta} cuenta Ingrese el codigo de la cuenta 
 * @param {Cliente} cliente Ingrese el codigo de la cuenta 
 * @param {diaInicial} cliente Ingrese el codigo de la cuenta 
 * @param {diaFinal} cliente Ingrese el codigo de la cuenta 
 * @param {Periodo} periodo Ingrese el codigo de la cuenta
 * @param {BU} bu Ingrese el codigo de la cuenta
 * @return {Number} The distance in miles.
 * @customfunction
 */
function Kvenccli(cuenta,cliente,diaInicial,diaFinal,periodo,bu) {       
    var fechas,cuentas,clientes,diaIniciales,diaFinales,periodos,bus;        
    
    var Nombre_Funcion = "Kvenccli";       
    var Nombre_Parametros = ["fecha","cuenta","cliente","diaInicial","diaFinal","periodo","bu"];

    //los rangos de las celdas seleccionadas
    fechas = rango_celdas_("fecha", getPropertyFechaInforme());//, getPropertyFechaInforme());
    cuentas = rango_celdas_("cuenta",cuenta);
    clientes = rango_celdas_("cliente",cliente);
    diaIniciales = rango_celdas_("diaInicial",diaInicial);
    diaFinales = rango_celdas_("diaFinal",diaFinal);
    periodos = rango_celdas_("periodo",periodo);
    bus = rango_celdas_("bu",bu);

    var Valores_Parametros = rango_parametros_([fechas,cuentas,clientes,diaIniciales,diaFinales,periodos,bus]);           
    var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
    
    return retorno;
}


/****************************************se crearon por scripts SQL *********************************************/


/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactdia(CUENTAS,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,FECHAs,BUs;

			var Nombre_Funcion = "Ksactdia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactaux(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactaux";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactauxdia(CUENTAS,AUXILIAR,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAs,BUs;

			var Nombre_Funcion = "Ksactauxdia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactcto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactcto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactctodia(CUENTAS,AUXILIAR,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAs,BUs;

			var Nombre_Funcion = "Ksactctodia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {OPER}
* @param {Terceros}
* @return {Number}.
							 * @customfunction
							 */
function KCliProTer(OPER,Terceros){
			var OPERs,Terceross;

			var Nombre_Funcion = "KCliProTer";
			var Nombre_Parametros = ["OPER","Terceros"];

			//los rangos de las celdas seleccionadas
			OPERs = rango_celdas_("OPER", OPER);
			Terceross = rango_celdas_("Terceros", Terceros);
			
			var Valores_Parametros = rango_parametros_([OPERs,Terceross]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactprv(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactprv";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpdb(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpdb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpcr(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpcr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpdia(CUENTAS,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpdia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpdiap(CUENTAS,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpdiap";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovclidb(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovclidb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovclicr(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovclicr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovprvdb(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovprvdb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovprvcr(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovprvcr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovcto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovcto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctodb(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctodb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctocr(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctocr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctodia(CUENTAS,AUXILIAR,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctodia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctodiap(CUENTAS,AUXILIAR,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctodiap";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovaux(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovaux";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovauxdb(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovauxdb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovauxcr(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovauxcr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {TERCERO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovter(CUENTAS,TERCERO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,TERCEROs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovter";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","TERCERO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			TERCEROs = rango_celdas_("TERCERO", TERCERO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,TERCEROs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {TERCERO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovterdb(CUENTAS,TERCERO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,TERCEROs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovterdb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","TERCERO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			TERCEROs = rango_celdas_("TERCERO", TERCERO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,TERCEROs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {TERCERO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovtercr(CUENTAS,TERCERO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,TERCEROs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovtercr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","TERCERO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			TERCEROs = rango_celdas_("TERCERO", TERCERO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,TERCEROs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {ITEM}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovItem(CUENTAS,ITEM,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,ITEMs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovItem";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","ITEM","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			ITEMs = rango_celdas_("ITEM", ITEM);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,ITEMs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {ITEM}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovItemdb(CUENTAS,ITEM,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,ITEMs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovItemdb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","ITEM","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			ITEMs = rango_celdas_("ITEM", ITEM);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,ITEMs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {ITEM}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovItemcr(CUENTAS,ITEM,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,ITEMs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovItemcr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","ITEM","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			ITEMs = rango_celdas_("ITEM", ITEM);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,ITEMs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {FECHAINI}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kingrecli(CUENTAS,AUXILIAR,FECHAINI,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAINIs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kingrecli";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","FECHAINI","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			FECHAINIs = rango_celdas_("FECHAINI", FECHAINI);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAINIs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {DIASINI}
* @param {DIASFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kvenc(CUENTAS,DIASINI,DIASFIN,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,DIASINIs,DIASFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kvenc";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","DIASINI","DIASFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			DIASINIs = rango_celdas_("DIASINI", DIASINI);
			DIASFINs = rango_celdas_("DIASFIN", DIASFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,DIASINIs,DIASFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PROVEEDORES}
* @param {DIASINI}
* @param {DIASFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kvencpro(CUENTAS,PROVEEDORES,DIASINI,DIASFIN,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PROVEEDORESs,DIASINIs,DIASFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kvencpro";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PROVEEDORES","DIASINI","DIASFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PROVEEDORESs = rango_celdas_("PROVEEDORES", PROVEEDORES);
			DIASINIs = rango_celdas_("DIASINI", DIASINI);
			DIASFINs = rango_celdas_("DIASFIN", DIASFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PROVEEDORESs,DIASINIs,DIASFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FECHAINI}
* @param {FECHAFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kvencf(CUENTAS,FECHAINI,FECHAFIN,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FECHAINIs,FECHAFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kvencf";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FECHAINI","FECHAFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FECHAINIs = rango_celdas_("FECHAINI", FECHAINI);
			FECHAFINs = rango_celdas_("FECHAFIN", FECHAFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FECHAINIs,FECHAFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {FECHAINI}
* @param {FECHAFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kchqpf(FECHAINI,FECHAFIN,PERIODOS,BU){
			var FECHA_ACTUALs,FECHAINIs,FECHAFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kchqpf";
			var Nombre_Parametros = ["FECHA_ACTUAL","FECHAINI","FECHAFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			FECHAINIs = rango_celdas_("FECHAINI", FECHAINI);
			FECHAFINs = rango_celdas_("FECHAFIN", FECHAFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,FECHAINIs,FECHAFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {OPER}
* @param {Cuenta}
* @return {Number}.
							 * @customfunction
							 */
function KCODPRESUACONTA(OPER,Cuenta){
			var OPERs,Cuentas;

			var Nombre_Funcion = "KCODPRESUACONTA";
			var Nombre_Parametros = ["OPER","Cuenta"];

			//los rangos de las celdas seleccionadas
			OPERs = rango_celdas_("OPER", OPER);
			Cuentas = rango_celdas_("Cuenta", Cuenta);
			
			var Valores_Parametros = rango_parametros_([OPERs,Cuentas]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {OPER}
* @param {Cuenta}
* @return {Number}.
							 * @customfunction
							 */
function KCODCONTAAPRESU(OPER,Cuenta){
			var OPERs,Cuentas;

			var Nombre_Funcion = "KCODCONTAAPRESU";
			var Nombre_Parametros = ["OPER","Cuenta"];

			//los rangos de las celdas seleccionadas
			OPERs = rango_celdas_("OPER", OPER);
			Cuentas = rango_celdas_("Cuenta", Cuenta);
			
			var Valores_Parametros = rango_parametros_([OPERs,Cuentas]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpres(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpres";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpresacu(CUENTAS,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpresacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpresal(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpresal";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpresalacu(CUENTAS,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpresalacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpreadi(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpreadi";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpreadiacu(CUENTAS,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpreadiacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretradb(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpretradb";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretradbacu(CUENTAS,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpretradbacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretracr(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpretracr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretracracu(CUENTAS,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpretracracu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kprescto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kprescto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpresctoacu(CUENTAS,AUXILIAR,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpresctoacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpresalcto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpresalcto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpresalctoacu(CUENTAS,AUXILIAR,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpresalctoacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpreadicto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpreadicto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpreadictoacu(CUENTAS,AUXILIAR,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpreadictoacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretradbcto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpretradbcto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretradbctoacu(CUENTAS,AUXILIAR,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpretradbctoacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretracrcto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kpretracrcto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {MESINI}
* @param {MESFIN}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kpretracrctoacu(CUENTAS,AUXILIAR,PERIODOS,MESINI,MESFIN,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs;

			var Nombre_Funcion = "Kpretracrctoacu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","MESINI","MESFIN","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			MESINIs = rango_celdas_("MESINI", MESINI);
			MESFINs = rango_celdas_("MESFIN", MESFIN);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,MESINIs,MESFINs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticulo(Fecha,ArticuloPresentacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticulo";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {TipoDocumento}
* @param {IndDbCr}
* @param {
Periodicidad}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpArticuloxTDUni(Fecha,ArticuloPresentacion,Bodega,Ubicacion,TipoDocumento,IndDbCr,Periodicidad,Periodo,ParamAdi,CodigoLibro){
            var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpArticuloxTDUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","TipoDocumento","IndDbCr","Periodicidad","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			IndDbCrs = rango_celdas_("IndDbCr", IndDbCr);			
            Periodicidads = rango_celdas_("Periodicidad", Periodicidad);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloValuni(Fecha,ArticuloPresentacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloValuni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovPDBArticulo(Fecha,ArticuloPresentacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovPDBArticulo";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovPCRArticulo(Fecha,ArticuloPresentacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovPCRArticulo";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloBodega(Fecha,ArticuloPresentacion,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloBodega";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloBodegaValuni(Fecha,ArticuloPresentacion,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloBodegaValuni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpDBArticuloBodega(Fecha,ArticuloPresentacion,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpDBArticuloBodega";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpCRArticuloBodega(Fecha,ArticuloPresentacion,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpCRArticuloBodega";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloBodegaUbicacion(Fecha,ArticuloPresentacion,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloBodegaUbicacionValuni(Fecha,ArticuloPresentacion,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloBodegaUbicacionValuni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpDBArticuloBodegaUbicacion(Fecha,ArticuloPresentacion,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpDBArticuloBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpCRArticuloBodegaUbicacion(Fecha,ArticuloPresentacion,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpCRArticuloBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactBodega(Fecha,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactBodega";
			var Nombre_Parametros = ["Fecha","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpDBBodega(Fecha,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpDBBodega";
			var Nombre_Parametros = ["Fecha","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {TipoDocumento}
* @param {IndDbCr}
* @param {Periodicidad}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpArticuloxTD(Fecha,ArticuloPresentacion,Bodega,Ubicacion,TipoDocumento,IndDbCr,Periodicidad,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpArticuloxTD";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","TipoDocumento","IndDbCr","Periodicidad","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			IndDbCrs = rango_celdas_("IndDbCr", IndDbCr);
			Periodicidads = rango_celdas_("Periodicidad", Periodicidad);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpCRBodega(Fecha,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpCRBodega";
			var Nombre_Parametros = ["Fecha","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactBodegaUbicacion(Fecha,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpDBBodegaUbicacion(Fecha,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpDBBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpCRBodegaUbicacion(Fecha,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpCRBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactBodegaUbicacionClasificacion(Fecha,Bodega,Ubicacion,Clasificacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Ubicacions,Clasificacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactBodegaUbicacionClasificacion";
			var Nombre_Parametros = ["Fecha","Bodega","Ubicacion","Clasificacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Ubicacions,Clasificacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpDBBodegaUbicacionClasificacion(Fecha,Bodega,Ubicacion,Clasificacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Ubicacions,Clasificacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpDBBodegaUbicacionClasificacion";
			var Nombre_Parametros = ["Fecha","Bodega","Ubicacion","Clasificacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Ubicacions,Clasificacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpCRBodegaUbicacionClasificacion(Fecha,Bodega,Ubicacion,Clasificacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Ubicacions,Clasificacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpCRBodegaUbicacionClasificacion";
			var Nombre_Parametros = ["Fecha","Bodega","Ubicacion","Clasificacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Ubicacions,Clasificacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Bodega}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {TipoDocumento}
* @param {IndDbCr}
* @param {Periodicidad}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpBodegaxTD(Fecha,Bodega,Ubicacion,Clasificacion,TipoDocumento,IndDbCr,Periodicidad,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Bodegas,Ubicacions,Clasificacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpBodegaxTD";
			var Nombre_Parametros = ["Fecha","Bodega","Ubicacion","Clasificacion","TipoDocumento","IndDbCr","Periodicidad","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			IndDbCrs = rango_celdas_("IndDbCr", IndDbCr);
			Periodicidads = rango_celdas_("Periodicidad", Periodicidad);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Bodegas,Ubicacions,Clasificacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactGrupo(Fecha,Grupo,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactGrupo";
			var Nombre_Parametros = ["Fecha","Grupo","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpDBGrupo(Fecha,Grupo,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpDBGrupo";
			var Nombre_Parametros = ["Fecha","Grupo","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpCRGrupo(Fecha,Grupo,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpCRGrupo";
			var Nombre_Parametros = ["Fecha","Grupo","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactGrupoBodega(Fecha,Grupo,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactGrupoBodega";
			var Nombre_Parametros = ["Fecha","Grupo","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpDBGrupoBodega(Fecha,Grupo,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpDBGrupoBodega";
			var Nombre_Parametros = ["Fecha","Grupo","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpCRGrupoBodega(Fecha,Grupo,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpCRGrupoBodega";
			var Nombre_Parametros = ["Fecha","Grupo","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactGrupoBodegaUbicacion(Fecha,Grupo,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactGrupoBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","Grupo","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpDBGrupoBodegaUbicacion(Fecha,Grupo,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpDBGrupoBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","Grupo","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpCRGrupoBodegaUbicacion(Fecha,Grupo,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpCRGrupoBodegaUbicacion";
			var Nombre_Parametros = ["Fecha","Grupo","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {Grupo}
* @param {Bodega}
* @param {Ubicacion}
* @param {TipoDocumento}
* @param {IndDbCr}
* @param {Periodicidad}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpGrupoxTD(Fecha,Grupo,Bodega,Ubicacion,TipoDocumento,IndDbCr,Periodicidad,Periodo,ParamAdi,CodigoLibro){
			var Fechas,Grupos,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpGrupoxTD";
			var Nombre_Parametros = ["Fecha","Grupo","Bodega","Ubicacion","TipoDocumento","IndDbCr","Periodicidad","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			Grupos = rango_celdas_("Grupo", Grupo);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			IndDbCrs = rango_celdas_("IndDbCr", IndDbCr);
			Periodicidads = rango_celdas_("Periodicidad", Periodicidad);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,Grupos,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Periodicidads,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}

/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactuni(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactctouni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactctouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CCOAUXOTRO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactauxuni(CUENTAS,CCOAUXOTRO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactauxuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CCOAUXOTRO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CCOAUXOTROs = rango_celdas_("CCOAUXOTRO", CCOAUXOTRO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpuni(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpdbuni(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpdbuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpcruni(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpcruni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CCOAUXOTRO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctouni(CUENTAS,CCOAUXOTRO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CCOAUXOTRO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CCOAUXOTROs = rango_celdas_("CCOAUXOTRO", CCOAUXOTRO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CCOAUXOTRO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctodbuni(CUENTAS,CCOAUXOTRO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctodbuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CCOAUXOTRO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CCOAUXOTROs = rango_celdas_("CCOAUXOTRO", CCOAUXOTRO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CCOAUXOTRO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctocruni(CUENTAS,CCOAUXOTRO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctocruni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CCOAUXOTRO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CCOAUXOTROs = rango_celdas_("CCOAUXOTRO", CCOAUXOTRO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CCOAUXOTRO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovauxuni(CUENTAS,CCOAUXOTRO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovauxuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CCOAUXOTRO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CCOAUXOTROs = rango_celdas_("CCOAUXOTRO", CCOAUXOTRO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CCOAUXOTRO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovauxdbuni(CUENTAS,CCOAUXOTRO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovauxdbuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CCOAUXOTRO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CCOAUXOTROs = rango_celdas_("CCOAUXOTRO", CCOAUXOTRO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CCOAUXOTRO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovauxcruni(CUENTAS,CCOAUXOTRO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovauxcruni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CCOAUXOTRO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CCOAUXOTROs = rango_celdas_("CCOAUXOTRO", CCOAUXOTRO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CCOAUXOTROs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Periodo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloUni(Fecha,ArticuloPresentacion,Periodo,CodigoLibro){
			var Fechas,ArticuloPresentacions,Periodos,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Periodo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Periodos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpDBArticuloUni(Fecha,ArticuloPresentacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpDBArticuloUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpCRArticuloUni(Fecha,ArticuloPresentacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpCRArticuloUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloBodegaUni(Fecha,ArticuloPresentacion,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloBodegaUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpDBArticuloBodegaUni(Fecha,ArticuloPresentacion,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpDBArticuloBodegaUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpCRArticuloBodegaUni(Fecha,ArticuloPresentacion,Bodega,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpCRArticuloBodegaUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IsactArticuloBodegaUbicacionUni(Fecha,ArticuloPresentacion,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IsactArticuloBodegaUbicacionUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpDBArticuloBodegaUbicacionUni(Fecha,ArticuloPresentacion,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpDBArticuloBodegaUbicacionUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {Periodo}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ImovpCRArticuloBodegaUbicacionUni(Fecha,ArticuloPresentacion,Bodega,Ubicacion,Periodo,ParamAdi,CodigoLibro){
			var Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "ImovpCRArticuloBodegaUbicacionUni";
			var Nombre_Parametros = ["Fecha","ArticuloPresentacion","Bodega","Ubicacion","Periodo","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			Fechas = rango_celdas_("Fecha", Fecha);
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Periodos = rango_celdas_("Periodo", Periodo);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fechas,ArticuloPresentacions,Bodegas,Ubicacions,Periodos,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Identificacion}
* @return {Number}.
							 * @customfunction
							 */
function NmEmpleado(Identificacion){
			var FECHA_ACTUALs,Identificacions;

			var Nombre_Funcion = "NmEmpleado";
			var Nombre_Parametros = ["FECHA_ACTUAL","Identificacion"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Identificacions = rango_celdas_("Identificacion", Identificacion);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Identificacions]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Resultado}
* @return {Number}.
							 * @customfunction
							 */
function NmEmpleadoContrato(Contrato,Resultado){
			var FECHA_ACTUALs,Contratos,Resultados;

			var Nombre_Funcion = "NmEmpleadoContrato";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Resultado"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Resultados = rango_celdas_("Resultado", Resultado);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Resultados]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValorConceptos(Contrato,Conceptos,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptoss,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValorConceptos";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {ListadoConceptos}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValorConceptosBase(Contrato,ListadoConceptos,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,ListadoConceptoss,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValorConceptosBase";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","ListadoConceptos","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			ListadoConceptoss = rango_celdas_("ListadoConceptos", ListadoConceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,ListadoConceptoss,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmCantidadesConceptos(Contrato,Conceptos,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptoss,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmCantidadesConceptos";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValAcumConceptos(Contrato,Conceptos,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValAcumConceptos";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValAcumConceptosBase(Contrato,Conceptos,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValAcumConceptosBase";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {CodLista}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValAcumListaConceptos(Contrato,CodLista,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,CodListas,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValAcumListaConceptos";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","CodLista","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			CodListas = rango_celdas_("CodLista", CodLista);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,CodListas,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValAcumSueldoBas(Contrato,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValAcumSueldoBas";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @param {RelativoI}
* @param {RelativoF}
* @param {TipoNomina}
* @param {Retirados}
* @param {TipoResultado}
* @param {Modalidad}
* @return {Number}.
							 * @customfunction
							 */
function NmValAcumConceptosAnt(Contrato,Conceptos,RelativoI,RelativoF,TipoNomina,Retirados,TipoResultado,Modalidad){
			var FECHA_ACTUALs,Contratos,Conceptoss,RelativoIs,RelativoFs,TipoNominas,Retiradoss,TipoResultados,Modalidads;

			var Nombre_Funcion = "NmValAcumConceptosAnt";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos","RelativoI","RelativoF","TipoNomina","Retirados","TipoResultado","Modalidad"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			RelativoIs = rango_celdas_("RelativoI", RelativoI);
			RelativoFs = rango_celdas_("RelativoF", RelativoF);
			TipoNominas = rango_celdas_("TipoNomina", TipoNomina);
			Retiradoss = rango_celdas_("Retirados", Retirados);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Modalidads = rango_celdas_("Modalidad", Modalidad);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss,RelativoIs,RelativoFs,TipoNominas,Retiradoss,TipoResultados,Modalidads]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {RelativoI}
* @param {RelativoF}
* @param {TipoNomina}
* @param {Retirados}
* @param {TipoResultado}
* @param {Modalidad}
* @return {Number}.
							 * @customfunction
							 */
function NmCantAcumConceptosAnt(Contrato,RelativoI,RelativoF,TipoNomina,Retirados,TipoResultado,Modalidad){
			var FECHA_ACTUALs,Contratos,RelativoIs,RelativoFs,TipoNominas,Retiradoss,TipoResultados,Modalidads;

			var Nombre_Funcion = "NmCantAcumConceptosAnt";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","RelativoI","RelativoF","TipoNomina","Retirados","TipoResultado","Modalidad"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			RelativoIs = rango_celdas_("RelativoI", RelativoI);
			RelativoFs = rango_celdas_("RelativoF", RelativoF);
			TipoNominas = rango_celdas_("TipoNomina", TipoNomina);
			Retiradoss = rango_celdas_("Retirados", Retirados);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Modalidads = rango_celdas_("Modalidad", Modalidad);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,RelativoIs,RelativoFs,TipoNominas,Retiradoss,TipoResultados,Modalidads]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValPromConceptos(Contrato,Conceptos,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValPromConceptos";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValPromConceptosBase(Contrato,Conceptos,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValPromConceptosBase";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {CodLista}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValPromListaConceptos(Contrato,CodLista,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,CodListas,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValPromListaConceptos";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","CodLista","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			CodListas = rango_celdas_("CodLista", CodLista);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,CodListas,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {IncluirPeriodo}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmValPromSueldoBas(Contrato,IncluirPeriodo,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,IncluirPeriodos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmValPromSueldoBas";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","IncluirPeriodo","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			IncluirPeriodos = rango_celdas_("IncluirPeriodo", IncluirPeriodo);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,IncluirPeriodos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Concepto}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmPromDicMayJunNov(Contrato,Concepto,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptos,PERIODOSs;

			var Nombre_Funcion = "NmPromDicMayJunNov";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Concepto","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptos = rango_celdas_("Concepto", Concepto);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptos,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Concepto}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmPromEne1JunJul1Dic(Contrato,Concepto,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptos,PERIODOSs;

			var Nombre_Funcion = "NmPromEne1JunJul1Dic";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Concepto","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptos = rango_celdas_("Concepto", Concepto);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptos,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Concepto}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmPromEneMayJulNov(Contrato,Concepto,PERIODOS){
			var FECHA_ACTUALs,Contratos,Conceptos,PERIODOSs;

			var Nombre_Funcion = "NmPromEneMayJulNov";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Concepto","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptos = rango_celdas_("Concepto", Concepto);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptos,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasAusencias(Contrato,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmDiasAusencias";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasDeducibles(Contrato,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmDiasDeducibles";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasNoRemunerados(Contrato,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmDiasNoRemunerados";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasTrab(Contrato,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmDiasTrab";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasRealesTrab(Contrato,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmDiasRealesTrab";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasNoTrab(Contrato,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmDiasNoTrab";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasAusenciasNoRemun(Contrato,TipoResultado,PERIODOS){
			var FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmDiasAusenciasNoRemun";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasFechas(Fecha_Inicial,Fecha_Final){
			var FECHA_ACTUALs,Fecha_Inicials,Fecha_Finals;

			var Nombre_Funcion = "NmDiasFechas";
			var Nombre_Parametros = ["FECHA_ACTUAL","Fecha_Inicial","Fecha_Final"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Fecha_Inicials,Fecha_Finals]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDomingosSuspension(Contrato,PERIODOS){
			var FECHA_ACTUALs,Contratos,PERIODOSs;

			var Nombre_Funcion = "NmDomingosSuspension";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {DiaAno1}
* @param {Rango1}
* @param {Dias1}
* @param {Rango2}
* @param {Dias2}
* @param {Rango3}
* @param {Dias3}
* @param {Rango4}
* @param {Dias4}
* @param {Deducible}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDiasIndemnizacion(Contrato,DiaAno1,Rango1,Dias1,Rango2,Dias2,Rango3,Dias3,Rango4,Dias4,Deducible,PERIODOS){
			var FECHA_ACTUALs,Contratos,DiaAno1s,Rango1s,Dias1s,Rango2s,Dias2s,Rango3s,Dias3s,Rango4s,Dias4s,Deducibles,PERIODOSs;

			var Nombre_Funcion = "NmDiasIndemnizacion";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","DiaAno1","Rango1","Dias1","Rango2","Dias2","Rango3","Dias3","Rango4","Dias4","Deducible","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			DiaAno1s = rango_celdas_("DiaAno1", DiaAno1);
			Rango1s = rango_celdas_("Rango1", Rango1);
			Dias1s = rango_celdas_("Dias1", Dias1);
			Rango2s = rango_celdas_("Rango2", Rango2);
			Dias2s = rango_celdas_("Dias2", Dias2);
			Rango3s = rango_celdas_("Rango3", Rango3);
			Dias3s = rango_celdas_("Dias3", Dias3);
			Rango4s = rango_celdas_("Rango4", Rango4);
			Dias4s = rango_celdas_("Dias4", Dias4);
			Deducibles = rango_celdas_("Deducible", Deducible);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,DiaAno1s,Rango1s,Dias1s,Rango2s,Dias2s,Rango3s,Dias3s,Rango4s,Dias4s,Deducibles,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDvngsContratos(Contratos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDvngsContratos";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDvngsConceptos(Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDvngsConceptos";
			var Nombre_Parametros = ["Fecha_Actual","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {CentrosCostos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDvngsCenCo(CentrosCostos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,CentrosCostoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDvngsCenCo";
			var Nombre_Parametros = ["Fecha_Actual","CentrosCostos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentrosCostoss = rango_celdas_("CentrosCostos", CentrosCostos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,CentrosCostoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {ClasContratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDvngsClasContratos(ClasContratos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,ClasContratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDvngsClasContratos";
			var Nombre_Parametros = ["Fecha_Actual","ClasContratos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ClasContratoss = rango_celdas_("ClasContratos", ClasContratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,ClasContratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Cargos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDvngsCargos(Cargos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Cargoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDvngsCargos";
			var Nombre_Parametros = ["Fecha_Actual","Cargos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Cargoss = rango_celdas_("Cargos", Cargos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Cargoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {BU}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDvngsBu(BU,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,BUs,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDvngsBu";
			var Nombre_Parametros = ["Fecha_Actual","BU","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			BUs = rango_celdas_("BU", BU);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,BUs,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDctosContratos(Contratos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDctosContratos";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDctosConceptos(Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDctosConceptos";
			var Nombre_Parametros = ["Fecha_Actual","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {CentrosCostos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDctosCenCo(CentrosCostos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,CentrosCostoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDctosCenCo";
			var Nombre_Parametros = ["Fecha_Actual","CentrosCostos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentrosCostoss = rango_celdas_("CentrosCostos", CentrosCostos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,CentrosCostoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {ClasContratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDctosClasContratos(ClasContratos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,ClasContratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDctosClasContratos";
			var Nombre_Parametros = ["Fecha_Actual","ClasContratos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ClasContratoss = rango_celdas_("ClasContratos", ClasContratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,ClasContratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Cargos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDctosCargos(Cargos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Cargoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDctosCargos";
			var Nombre_Parametros = ["Fecha_Actual","Cargos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Cargoss = rango_celdas_("Cargos", Cargos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Cargoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {BU}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmDctosBU(BU,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,BUs,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmDctosBU";
			var Nombre_Parametros = ["Fecha_Actual","BU","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			BUs = rango_celdas_("BU", BU);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,BUs,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmTotalContratos(Contratos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmTotalContratos";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmTotalConceptos(Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmTotalConceptos";
			var Nombre_Parametros = ["Fecha_Actual","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {CentrosCostos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmTotalCenCo(CentrosCostos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,CentrosCostoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmTotalCenCo";
			var Nombre_Parametros = ["Fecha_Actual","CentrosCostos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentrosCostoss = rango_celdas_("CentrosCostos", CentrosCostos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,CentrosCostoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {ClasContratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmTotalClasContratos(ClasContratos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,ClasContratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmTotalClasContratos";
			var Nombre_Parametros = ["Fecha_Actual","ClasContratos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ClasContratoss = rango_celdas_("ClasContratos", ClasContratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,ClasContratoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Cargos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmTotalCargos(Cargos,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,Cargoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmTotalCargos";
			var Nombre_Parametros = ["Fecha_Actual","Cargos","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Cargoss = rango_celdas_("Cargos", Cargos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Cargoss,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {BU}
* @param {Conceptos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmTotalBU(BU,Conceptos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,BUs,Conceptoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmTotalBU";
			var Nombre_Parametros = ["Fecha_Actual","BU","Conceptos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			BUs = rango_celdas_("BU", BU);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,BUs,Conceptoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIdentificacion(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIdentificacion";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoNombres(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoNombres";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFchNacimiento(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFchNacimiento";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoSexo(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoSexo";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoEstadoCivil(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoEstadoCivil";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFchInicio(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFchInicio";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFchVencimiento(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFchVencimiento";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoCargo(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoCargo";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoTipoSalario(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoTipoSalario";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {IndSueldoAnt}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoSueldoB(Contrato,IndSueldoAnt,PERIODOS){
			var FECHA_ACTUALs,Contratos,IndSueldoAnts,PERIODOSs;

			var Nombre_Funcion = "NmContratoSueldoB";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","IndSueldoAnt","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			IndSueldoAnts = rango_celdas_("IndSueldoAnt", IndSueldoAnt);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,IndSueldoAnts,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoTipoContrato(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoTipoContrato";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoTipoNomina(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoTipoNomina";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoClasificacion(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoClasificacion";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @param {Conceptos}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoVConceptoFijo(Contrato,Conceptos){
			var FECHA_ACTUALs,Contratos,Conceptoss;

			var Nombre_Funcion = "NmContratoVConceptoFijo";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato","Conceptos"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos,Conceptoss]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoCentroCosto(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoCentroCosto";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoBU(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoBU";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFormaPago(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFormaPago";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoTipoRemuneracion(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoTipoRemuneracion";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoHorasMes(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoHorasMes";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIndAltoRiesgo(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIndAltoRiesgo";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIndPensionado(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIndPensionado";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIndSena(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIndSena";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIndEstudiante(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIndEstudiante";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIndLey50(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIndLey50";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIndDefault(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIndDefault";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoIndRetirado(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoIndRetirado";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoDiasAbandono(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoDiasAbandono";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoPensionVEmpleador(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoPensionVEmpleador";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFchUltAumento(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFchUltAumento";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoTipoRetiro(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoTipoRetiro";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFchRetiro(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFchRetiro";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFchVacI(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFchVacI";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Contrato}
* @return {Number}.
							 * @customfunction
							 */
function NmContratoFchVacF(Contrato){
			var FECHA_ACTUALs,Contratos;

			var Nombre_Funcion = "NmContratoFchVacF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Contrato"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratos = rango_celdas_("Contrato", Contrato);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Contratos]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocBaseI(Contratos,Conceptos,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmSegSocBaseI";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocAptEmpleador(Contratos,Conceptos,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmSegSocAptEmpleador";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocBaseIAnoMes(Contratos,Conceptos,AnoMes){
			var Fecha_Actuals,Contratoss,Conceptoss,AnoMess;

			var Nombre_Funcion = "NmSegSocBaseIAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocAptEmpleadorAnoMes(Contratos,Conceptos,AnoMes){
			var Fecha_Actuals,Contratoss,Conceptoss,AnoMess;

			var Nombre_Funcion = "NmSegSocAptEmpleadorAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocAptEmpleadoAnoMes(Contratos,Conceptos,AnoMes){
			var Fecha_Actuals,Contratoss,Conceptoss,AnoMess;

			var Nombre_Funcion = "NmSegSocAptEmpleadoAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocAptEmpleado(Contratos,Conceptos,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmSegSocAptEmpleado";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocAptEmplEmpleador(Contratos,Conceptos,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmSegSocAptEmplEmpleador";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {Conceptos}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmSegSocAptEmplEmpleadorAnoMes(Contratos,Conceptos,AnoMes){
			var Fecha_Actuals,Contratoss,Conceptoss,AnoMess;

			var Nombre_Funcion = "NmSegSocAptEmplEmpleadorAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","Conceptos","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			Conceptoss = rango_celdas_("Conceptos", Conceptos);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,Conceptoss,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfValor(Contratos,ProvisionesParafiscales,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmPrvPrfValor";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfCantidad(Contratos,ProvisionesParafiscales,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmPrvPrfCantidad";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfBase(Contratos,ProvisionesParafiscales,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmPrvPrfBase";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {TipoResultado}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfPorcentaje(Contratos,ProvisionesParafiscales,TipoResultado,PERIODOS){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs;

			var Nombre_Funcion = "NmPrvPrfPorcentaje";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","TipoResultado","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,TipoResultados,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfValorAnoMes(Contratos,ProvisionesParafiscales,AnoMes){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess;

			var Nombre_Funcion = "NmPrvPrfValorAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfCantidadAnoMes(Contratos,ProvisionesParafiscales,AnoMes){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess;

			var Nombre_Funcion = "NmPrvPrfCantidadAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfBaseAnoMes(Contratos,ProvisionesParafiscales,AnoMes){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess;

			var Nombre_Funcion = "NmPrvPrfBaseAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {Contratos}
* @param {ProvisionesParafiscales}
* @param {AnoMes}
* @return {Number}.
							 * @customfunction
							 */
function NmPrvPrfPorcentajeAnoMes(Contratos,ProvisionesParafiscales,AnoMes){
			var Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess;

			var Nombre_Funcion = "NmPrvPrfPorcentajeAnoMes";
			var Nombre_Parametros = ["Fecha_Actual","Contratos","ProvisionesParafiscales","AnoMes"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Contratoss = rango_celdas_("Contratos", Contratos);
			ProvisionesParafiscaless = rango_celdas_("ProvisionesParafiscales", ProvisionesParafiscales);
			AnoMess = rango_celdas_("AnoMes", AnoMes);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,Contratoss,ProvisionesParafiscaless,AnoMess]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Grupo}
* @param {TDocumento}
* @param {Fuente}
* @param {FechaI}
* @param {FechaF}
* @param {Seriales}
* @param {UnidadMedida}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovArticulo(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,Grupo,TDocumento,Fuente,FechaI,FechaF,Seriales,UnidadMedida,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Grupos,TDocumentos,Fuentes,FechaIs,FechaFs,Serialess,UnidadMedidas,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovArticulo";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","Grupo","TDocumento","Fuente","FechaI","FechaF","Seriales","UnidadMedida","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Grupos = rango_celdas_("Grupo", Grupo);
			TDocumentos = rango_celdas_("TDocumento", TDocumento);
			Fuentes = rango_celdas_("Fuente", Fuente);
			FechaIs = rango_celdas_("FechaI", FechaI);
			FechaFs = rango_celdas_("FechaF", FechaF);
			Serialess = rango_celdas_("Seriales", Seriales);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Grupos,TDocumentos,Fuentes,FechaIs,FechaFs,Serialess,UnidadMedidas,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {TipoMovimiento}
* @param {FechaI}
* @param {FechaF}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovArtF(ArticuloPresentacion,TipoMovimiento,FechaI,FechaF,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,TipoMovimientos,FechaIs,FechaFs,CodigoLibros;

			var Nombre_Funcion = "IMovArtF";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","TipoMovimiento","FechaI","FechaF","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			FechaIs = rango_celdas_("FechaI", FechaI);
			FechaFs = rango_celdas_("FechaF", FechaF);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,TipoMovimientos,FechaIs,FechaFs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovBodF(Bodega,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovBodF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovLotF(Lote,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Lotes,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovLotF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Clasificacion}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovClaF(Clasificacion,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovClaF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Clasificacion","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupo}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovGruF(Grupo,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Grupos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovGruF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupo","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Grupos = rango_celdas_("Grupo", Grupo);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Grupos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Fuente}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovFntF(Fuente,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Fuentes,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovFntF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Fuente","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Fuentes = rango_celdas_("Fuente", Fuente);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Fuentes,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Series}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovSer(Series,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Seriess,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovSer";
			var Nombre_Parametros = ["FECHA_ACTUAL","Series","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Seriess = rango_celdas_("Series", Series);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Seriess,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TipoDocumento}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovTipoDocF(TipoDocumento,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovTipoDocF";
			var Nombre_Parametros = ["FECHA_ACTUAL","TipoDocumento","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovArtBodF(ArticuloPresentacion,Bodega,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovArtBodF";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {TipoDocumento}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovArtTipoDocF(ArticuloPresentacion,TipoDocumento,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovArtTipoDocF";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","TipoDocumento","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Lote}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovBodLotF(Bodega,Lote,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Lotes,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovBodLotF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Lote","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Lotes,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Clasificacion}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovBodClaF(Bodega,Clasificacion,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovBodClaF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Clasificacion","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Grupo}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovBodGruF(Bodega,Grupo,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Grupos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovBodGruF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Grupo","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Grupos = rango_celdas_("Grupo", Grupo);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Grupos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Serie}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovBodSerF(Bodega,Serie,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Series,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovBodSerF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Serie","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Series = rango_celdas_("Serie", Serie);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Series,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {TipoDocumento}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovLotTipoDocF(Lote,TipoDocumento,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Lotes,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovLotTipoDocF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","TipoDocumento","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {Clasificacion}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovLotClaF(Lote,Clasificacion,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Lotes,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovLotClaF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","Clasificacion","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupo}
* @param {TipoDocumento}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovGruTipoDocF(Grupo,TipoDocumento,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Grupos,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovGruTipoDocF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupo","TipoDocumento","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Grupos = rango_celdas_("Grupo", Grupo);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Grupos,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Lote}
* @param {Clasificacion}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovBodLotClaF(Bodega,Lote,Clasificacion,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Lotes,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovBodLotClaF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Lote","Clasificacion","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Lotes,Clasificacions,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Grupo}
* @param {TipoDocumento}
* @param {TipoMovimiento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovBodGruTipoDocF(Bodega,Grupo,TipoDocumento,TipoMovimiento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Grupos,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IMovBodGruTipoDocF";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Grupo","TipoDocumento","TipoMovimiento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Grupos = rango_celdas_("Grupo", Grupo);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			TipoMovimientos = rango_celdas_("TipoMovimiento", TipoMovimiento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Grupos,TipoDocumentos,TipoMovimientos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Series}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactGenUni(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,Series,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Seriess,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactGenUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","Series","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Seriess = rango_celdas_("Series", Series);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Seriess,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Clasificacion}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactArtClaU(ArticuloPresentacion,Clasificacion,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Clasificacions,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactArtClaU";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Clasificacion","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Clasificacions,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Series}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactArtSerU(ArticuloPresentacion,Series,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Seriess,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactArtSerU";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Series","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Seriess = rango_celdas_("Series", Series);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Seriess,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Lote}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactBodLotU(Bodega,Lote,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Lotes,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactBodLotU";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Lote","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Lotes,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {Clasificacion}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactLotClaU(Lote,Clasificacion,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Lotes,Clasificacions,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactLotClaU";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","Clasificacion","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,Clasificacions,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactLot(Lote,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Lotes,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactLot";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Clasificacion}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactCla(Clasificacion,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Clasificacions,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactCla";
			var Nombre_Parametros = ["FECHA_ACTUAL","Clasificacion","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Clasificacions,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Series}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactSer(Series,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Seriess,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactSer";
			var Nombre_Parametros = ["FECHA_ACTUAL","Series","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Seriess = rango_celdas_("Series", Series);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Seriess,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Lote}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactBodLot(Bodega,Lote,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Lotes,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactBodLot";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Lote","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Lotes,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Clasificacion}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactBodCla(Bodega,Clasificacion,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Clasificacions,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactBodCla";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Clasificacion","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Clasificacions,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Lote}
* @param {Clasificacion}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactBodLotCla(Bodega,Lote,Clasificacion,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Lotes,Clasificacions,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactBodLotCla";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Lote","Clasificacion","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Lotes,Clasificacions,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {ItemsContable}
* @param {Tercero}
* @param {CentroCosto}
* @param {Concepto}
* @param {Grupos}
* @param {UnidadMedida}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsumosGen(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,ItemsContable,Tercero,CentroCosto,Concepto,Grupos,UnidadMedida,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,ItemsContables,Terceros,CentroCostos,Conceptos,Gruposs,UnidadMedidas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsumosGen";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","ItemsContable","Tercero","CentroCosto","Concepto","Grupos","UnidadMedida","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			ItemsContables = rango_celdas_("ItemsContable", ItemsContable);
			Terceros = rango_celdas_("Tercero", Tercero);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Gruposs = rango_celdas_("Grupos", Grupos);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,ItemsContables,Terceros,CentroCostos,Conceptos,Gruposs,UnidadMedidas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsArt(ArticuloPresentacion,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsArt";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsBod(Bodega,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsLot(Lote,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Lotes,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsLot";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Clasificacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsCla(Clasificacion,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Clasificacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsCla";
			var Nombre_Parametros = ["FECHA_ACTUAL","Clasificacion","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Clasificacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsGru(Grupos,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Tercero}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsTer(Tercero,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsTer";
			var Nombre_Parametros = ["FECHA_ACTUAL","Tercero","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Terceros = rango_celdas_("Tercero", Tercero);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Concepto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsCon(Concepto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Concepto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptos = rango_celdas_("Concepto", Concepto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsCco(CentroCosto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","CentroCosto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ItemsContable}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsItm(ItemsContable,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsItm";
			var Nombre_Parametros = ["FECHA_ACTUAL","ItemsContable","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ItemsContables = rango_celdas_("ItemsContable", ItemsContable);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsArtBod(ArticuloPresentacion,Bodega,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsArtBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsBodGru(Bodega,Grupos,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsBodGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Grupos","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Concepto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsBodCon(Bodega,Concepto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsBodCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Concepto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsBodCco(Bodega,CentroCosto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsBodCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","CentroCosto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {Clasificacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsLotCla(Lote,Clasificacion,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Lotes,Clasificacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsLotCla";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","Clasificacion","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,Clasificacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Concepto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsGruCon(Grupos,Concepto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsGruCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Concepto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsGruCco(Grupos,CentroCosto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsGruCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","CentroCosto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Concepto}
* @param {Tercero}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsConTer(Concepto,Tercero,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Conceptos,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsConTer";
			var Nombre_Parametros = ["FECHA_ACTUAL","Concepto","Tercero","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptos = rango_celdas_("Concepto", Concepto);
			Terceros = rango_celdas_("Tercero", Tercero);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Conceptos,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Concepto}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsConCco(Concepto,CentroCosto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Conceptos,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsConCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Concepto","CentroCosto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptos = rango_celdas_("Concepto", Concepto);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Conceptos,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Concepto}
* @param {ItemsContable}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsConItm(Concepto,ItemsContable,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Conceptos,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsConItm";
			var Nombre_Parametros = ["FECHA_ACTUAL","Concepto","ItemsContable","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptos = rango_celdas_("Concepto", Concepto);
			ItemsContables = rango_celdas_("ItemsContable", ItemsContable);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Conceptos,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CentroCosto}
* @param {Tercero}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsCcoTer(CentroCosto,Tercero,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,CentroCostos,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsCcoTer";
			var Nombre_Parametros = ["FECHA_ACTUAL","CentroCosto","Tercero","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Terceros = rango_celdas_("Tercero", Tercero);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CentroCostos,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Concepto}
* @param {Tercero}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IConsGruTerCon(Grupos,Concepto,Tercero,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Conceptos,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IConsGruTerCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Concepto","Tercero","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Terceros = rango_celdas_("Tercero", Tercero);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Conceptos,Terceros,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Concepto}
* @param {Cliente}
* @param {TipoCliente}
* @param {Zona}
* @param {Segmento}
* @param {Grupos}
* @param {CentroCosto}
* @param {UbicacionGeografica}
* @param {Fuente}
* @param {Vendedor}
* @param {UnidadMedida}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVentas(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,Concepto,Cliente,TipoCliente,Zona,Segmento,Grupos,CentroCosto,UbicacionGeografica,Fuente,Vendedor,UnidadMedida,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Conceptos,Clientes,TipoClientes,Zonas,Segmentos,Gruposs,CentroCostos,UbicacionGeograficas,Fuentes,Vendedors,UnidadMedidas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVentas";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","Concepto","Cliente","TipoCliente","Zona","Segmento","Grupos","CentroCosto","UbicacionGeografica","Fuente","Vendedor","UnidadMedida","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Clientes = rango_celdas_("Cliente", Cliente);
			TipoClientes = rango_celdas_("TipoCliente", TipoCliente);
			Zonas = rango_celdas_("Zona", Zona);
			Segmentos = rango_celdas_("Segmento", Segmento);
			Gruposs = rango_celdas_("Grupos", Grupos);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			UbicacionGeograficas = rango_celdas_("UbicacionGeografica", UbicacionGeografica);
			Fuentes = rango_celdas_("Fuente", Fuente);
			Vendedors = rango_celdas_("Vendedor", Vendedor);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Conceptos,Clientes,TipoClientes,Zonas,Segmentos,Gruposs,CentroCostos,UbicacionGeograficas,Fuentes,Vendedors,UnidadMedidas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVArt(ArticuloPresentacion,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVArt";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVBod(Bodega,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVLot(Lote,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Lotes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVLot";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Clasificacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVCla(Clasificacion,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Clasificacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVCla";
			var Nombre_Parametros = ["FECHA_ACTUAL","Clasificacion","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Clasificacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVGru(Grupos,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Cliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVCli(Cliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","Cliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Clientes = rango_celdas_("Cliente", Cliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TipoCliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVTCli(TipoCliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVTCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","TipoCliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TipoClientes = rango_celdas_("TipoCliente", TipoCliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVCco(CentroCosto,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","CentroCosto","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Segmento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVSeg(Segmento,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVSeg";
			var Nombre_Parametros = ["FECHA_ACTUAL","Segmento","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Segmentos = rango_celdas_("Segmento", Segmento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Zona}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVZon(Zona,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVZon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Zona","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Zonas = rango_celdas_("Zona", Zona);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Vendedor}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVVen(Vendedor,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Vendedors,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVVen";
			var Nombre_Parametros = ["FECHA_ACTUAL","Vendedor","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Vendedors = rango_celdas_("Vendedor", Vendedor);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Vendedors,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {UbicacionGeografica}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVUGeo(UbicacionGeografica,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVUGeo";
			var Nombre_Parametros = ["FECHA_ACTUAL","UbicacionGeografica","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			UbicacionGeograficas = rango_celdas_("UbicacionGeografica", UbicacionGeografica);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVArtBod(ArticuloPresentacion,Bodega,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVArtBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVBodGru(Bodega,Grupos,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVBodGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Grupos","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVBodCco(Bodega,CentroCosto,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVBodCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","CentroCosto","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Cliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVGruCli(Grupos,Cliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVGruCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Cliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Clientes = rango_celdas_("Cliente", Cliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {TipoCliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVGruTCli(Grupos,TipoCliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVGruTCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","TipoCliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			TipoClientes = rango_celdas_("TipoCliente", TipoCliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Segmento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVGruSeg(Grupos,Segmento,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVGruSeg";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Segmento","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Segmentos = rango_celdas_("Segmento", Segmento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Zona}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVGruZon(Grupos,Zona,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVGruZon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Zona","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Zonas = rango_celdas_("Zona", Zona);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVGruCco(Grupos,CentroCosto,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVGruCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","CentroCosto","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {UbicacionGeografica}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IIngrVGruUGeo(Grupos,UbicacionGeografica,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "IIngrVGruUGeo";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","UbicacionGeografica","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			UbicacionGeograficas = rango_celdas_("UbicacionGeografica", UbicacionGeografica);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVArt(ArticuloPresentacion,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVArt";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Concepto}
* @param {Cliente}
* @param {TipoCliente}
* @param {Zona}
* @param {Segmento}
* @param {Grupos}
* @param {CentroCosto}
* @param {UbicacionGeografica}
* @param {Fuente}
* @param {Vendedor}
* @param {UnidadMedida}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVentas(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,Concepto,Cliente,TipoCliente,Zona,Segmento,Grupos,CentroCosto,UbicacionGeografica,Fuente,Vendedor,UnidadMedida,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Conceptos,Clientes,TipoClientes,Zonas,Segmentos,Gruposs,CentroCostos,UbicacionGeograficas,Fuentes,Vendedors,UnidadMedidas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVentas";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","Concepto","Cliente","TipoCliente","Zona","Segmento","Grupos","CentroCosto","UbicacionGeografica","Fuente","Vendedor","UnidadMedida","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Clientes = rango_celdas_("Cliente", Cliente);
			TipoClientes = rango_celdas_("TipoCliente", TipoCliente);
			Zonas = rango_celdas_("Zona", Zona);
			Segmentos = rango_celdas_("Segmento", Segmento);
			Gruposs = rango_celdas_("Grupos", Grupos);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			UbicacionGeograficas = rango_celdas_("UbicacionGeografica", UbicacionGeografica);
			Fuentes = rango_celdas_("Fuente", Fuente);
			Vendedors = rango_celdas_("Vendedor", Vendedor);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Conceptos,Clientes,TipoClientes,Zonas,Segmentos,Gruposs,CentroCostos,UbicacionGeograficas,Fuentes,Vendedors,UnidadMedidas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVBod(Bodega,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Lote}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVLot(Lote,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Lotes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVLot";
			var Nombre_Parametros = ["FECHA_ACTUAL","Lote","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Lotes = rango_celdas_("Lote", Lote);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Lotes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Clasificacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVCla(Clasificacion,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Clasificacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVCla";
			var Nombre_Parametros = ["FECHA_ACTUAL","Clasificacion","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Clasificacions,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVGru(Grupos,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Cliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVCli(Cliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","Cliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Clientes = rango_celdas_("Cliente", Cliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TipoCliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVTCli(TipoCliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVTCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","TipoCliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TipoClientes = rango_celdas_("TipoCliente", TipoCliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVCco(CentroCosto,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","CentroCosto","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Segmento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVSeg(Segmento,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVSeg";
			var Nombre_Parametros = ["FECHA_ACTUAL","Segmento","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Segmentos = rango_celdas_("Segmento", Segmento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Zona}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVZon(Zona,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVZon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Zona","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Zonas = rango_celdas_("Zona", Zona);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Vendedor}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVVen(Vendedor,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Vendedors,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVVen";
			var Nombre_Parametros = ["FECHA_ACTUAL","Vendedor","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Vendedors = rango_celdas_("Vendedor", Vendedor);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Vendedors,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {UbicacionGeografica}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVUGeo(UbicacionGeografica,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVUGeo";
			var Nombre_Parametros = ["FECHA_ACTUAL","UbicacionGeografica","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			UbicacionGeograficas = rango_celdas_("UbicacionGeografica", UbicacionGeografica);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVArtBod(ArticuloPresentacion,Bodega,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVArtBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVBodGru(Bodega,Grupos,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVBodGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Grupos","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVBodCco(Bodega,CentroCosto,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVBodCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","CentroCosto","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Cliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVGruCli(Grupos,Cliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVGruCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Cliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Clientes = rango_celdas_("Cliente", Cliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Clientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {TipoCliente}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVGruTCli(Grupos,TipoCliente,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVGruTCli";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","TipoCliente","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			TipoClientes = rango_celdas_("TipoCliente", TipoCliente);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,TipoClientes,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Segmento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVGruSeg(Grupos,Segmento,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVGruSeg";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Segmento","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Segmentos = rango_celdas_("Segmento", Segmento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Segmentos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Zona}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVGruZon(Grupos,Zona,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVGruZon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Zona","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Zonas = rango_celdas_("Zona", Zona);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Zonas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVGruCco(Grupos,CentroCosto,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVGruCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","CentroCosto","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {UbicacionGeografica}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICostVGruUGeo(Grupos,UbicacionGeografica,Fecha_Inicial,Fecha_Final,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ICostVGruUGeo";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","UbicacionGeografica","Fecha_Inicial","Fecha_Final","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			UbicacionGeograficas = rango_celdas_("UbicacionGeografica", UbicacionGeografica);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,UbicacionGeograficas,Fecha_Inicials,Fecha_Finals,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Items}
* @param {Tercero}
* @param {CentroCosto}
* @param {Concepto}
* @param {Grupos}
* @param {UnidadMedida}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustGen(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,Items,Tercero,CentroCosto,Concepto,Grupos,UnidadMedida,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Itemss,Terceros,CentroCostos,Conceptos,Gruposs,UnidadMedidas,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustGen";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","Items","Tercero","CentroCosto","Concepto","Grupos","UnidadMedida","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Itemss = rango_celdas_("Items", Items);
			Terceros = rango_celdas_("Tercero", Tercero);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Gruposs = rango_celdas_("Grupos", Grupos);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Itemss,Terceros,CentroCostos,Conceptos,Gruposs,UnidadMedidas,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustBod(Bodega,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustGru(Grupos,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ItemsContables}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustItm(ItemsContables,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,ItemsContabless,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustItm";
			var Nombre_Parametros = ["FECHA_ACTUAL","ItemsContables","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ItemsContabless = rango_celdas_("ItemsContables", ItemsContables);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ItemsContabless,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Concepto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustCon(Concepto,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Conceptos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Concepto","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Conceptos = rango_celdas_("Concepto", Concepto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Conceptos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustCco(CentroCosto,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","CentroCosto","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustBodGru(Bodega,Grupos,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustBodGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Grupos","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Concepto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustBodCon(Bodega,Concepto,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Conceptos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustBodCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Concepto","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Conceptos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustBodCco(Bodega,CentroCosto,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustBodCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","CentroCosto","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,CentroCostos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Concepto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustGruCon(Grupos,Concepto,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Conceptos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustGruCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Concepto","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Conceptos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAjustGruCco(Grupos,CentroCosto,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "IAjustGruCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","CentroCosto","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {TipoCliente}
* @param {FechaPeriodo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IPrecioArt(ArticuloPresentacion,Bodega,TipoCliente,FechaPeriodo,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,TipoClientes,FechaPeriodos,CodigoLibros;

			var Nombre_Funcion = "IPrecioArt";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","TipoCliente","FechaPeriodo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			TipoClientes = rango_celdas_("TipoCliente", TipoCliente);
			FechaPeriodos = rango_celdas_("FechaPeriodo", FechaPeriodo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,TipoClientes,FechaPeriodos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IFechaUltCompra(ArticuloPresentacion,Bodega,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,CodigoLibros;

			var Nombre_Funcion = "IFechaUltCompra";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {TipoDocumento}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICantPendientes(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,TipoDocumento,Fecha_Inicial,Fecha_Final,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,TipoDocumentos,Fecha_Inicials,Fecha_Finals,CodigoLibros;

			var Nombre_Funcion = "ICantPendientes";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","TipoDocumento","Fecha_Inicial","Fecha_Final","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,TipoDocumentos,Fecha_Inicials,Fecha_Finals,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {CodVariable}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IVariablePtoReOrden(ArticuloPresentacion,Bodega,CodVariable,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,CodVariables,CodigoLibros;

			var Nombre_Funcion = "IVariablePtoReOrden";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","CodVariable","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			CodVariables = rango_celdas_("CodVariable", CodVariable);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,CodVariables,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICantEntSal(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "ICantEntSal";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CodVariable}
* @param {Bodega}
* @param {TipoCalculo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ICalcVariablePuntoReOrden(CodVariable,Bodega,TipoCalculo,CodigoLibro){
			var FECHA_ACTUALs,CodVariables,Bodegas,TipoCalculos,CodigoLibros;

			var Nombre_Funcion = "ICalcVariablePuntoReOrden";
			var Nombre_Parametros = ["FECHA_ACTUAL","CodVariable","Bodega","TipoCalculo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CodVariables = rango_celdas_("CodVariable", CodVariable);
			Bodegas = rango_celdas_("Bodega", Bodega);
			TipoCalculos = rango_celdas_("TipoCalculo", TipoCalculo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CodVariables,Bodegas,TipoCalculos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Fecha_Info}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IAntiguedadProducto(ArticuloPresentacion,Fecha_Info,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Fecha_Infos,CodigoLibros;

			var Nombre_Funcion = "IAntiguedadProducto";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Fecha_Info","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Fecha_Infos = rango_celdas_("Fecha_Info", Fecha_Info);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Fecha_Infos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Lote}
* @param {Fecha_Info}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IVencimientoProducto(ArticuloPresentacion,Lote,Fecha_Info,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Lotes,Fecha_Infos,CodigoLibros;

			var Nombre_Funcion = "IVencimientoProducto";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Lote","Fecha_Info","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Lotes = rango_celdas_("Lote", Lote);
			Fecha_Infos = rango_celdas_("Fecha_Info", Fecha_Info);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Lotes,Fecha_Infos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtBod(Bodega,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtBod";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtGru(Grupos,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {ItemsContables}
* @param {Tercero}
* @param {CentroCosto}
* @param {Concepto}
* @param {Categoria}
* @param {Grupos}
* @param {UnidadMedida}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtGen(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,ItemsContables,Tercero,CentroCosto,Concepto,Categoria,Grupos,UnidadMedida,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,ItemsContabless,Terceros,CentroCostos,Conceptos,Categorias,Gruposs,UnidadMedidas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtGen";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","ItemsContables","Tercero","CentroCosto","Concepto","Categoria","Grupos","UnidadMedida","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			ItemsContabless = rango_celdas_("ItemsContables", ItemsContables);
			Terceros = rango_celdas_("Tercero", Tercero);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Categorias = rango_celdas_("Categoria", Categoria);
			Gruposs = rango_celdas_("Grupos", Grupos);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,ItemsContabless,Terceros,CentroCostos,Conceptos,Categorias,Gruposs,UnidadMedidas,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ItemsContable}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtItm(ItemsContable,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtItm";
			var Nombre_Parametros = ["FECHA_ACTUAL","ItemsContable","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ItemsContables = rango_celdas_("ItemsContable", ItemsContable);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CategoriaMovExt}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtCat(CategoriaMovExt,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,CategoriaMovExts,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtCat";
			var Nombre_Parametros = ["FECHA_ACTUAL","CategoriaMovExt","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CategoriaMovExts = rango_celdas_("CategoriaMovExt", CategoriaMovExt);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CategoriaMovExts,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtCco(CentroCosto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","CentroCosto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {Grupos}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtBodGru(Bodega,Grupos,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtBodGru";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","Grupos","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			Gruposs = rango_celdas_("Grupos", Grupos);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,Gruposs,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Bodega}
* @param {CategoriaMovExt}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtBodCat(Bodega,CategoriaMovExt,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Bodegas,CategoriaMovExts,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtBodCat";
			var Nombre_Parametros = ["FECHA_ACTUAL","Bodega","CategoriaMovExt","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Bodegas = rango_celdas_("Bodega", Bodega);
			CategoriaMovExts = rango_celdas_("CategoriaMovExt", CategoriaMovExt);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Bodegas,CategoriaMovExts,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {ItemsContable}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtGruItm(Grupos,ItemsContable,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtGruItm";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","ItemsContable","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			ItemsContables = rango_celdas_("ItemsContable", ItemsContable);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,ItemsContables,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {Concepto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtGruCon(Grupos,Concepto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtGruCon";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","Concepto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			Conceptos = rango_celdas_("Concepto", Concepto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,Conceptos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Grupos}
* @param {CentroCosto}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Tipo}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovExtGruCco(Grupos,CentroCosto,Fecha_Inicial,Fecha_Final,Tipo,CodigoLibro){
			var FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros;

			var Nombre_Funcion = "IMovExtGruCco";
			var Nombre_Parametros = ["FECHA_ACTUAL","Grupos","CentroCosto","Fecha_Inicial","Fecha_Final","Tipo","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Gruposs = rango_celdas_("Grupos", Grupos);
			CentroCostos = rango_celdas_("CentroCosto", CentroCosto);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Tipos = rango_celdas_("Tipo", Tipo);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Gruposs,CentroCostos,Fecha_Inicials,Fecha_Finals,Tipos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MFechaFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MFechaFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MVencimientoFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MVencimientoFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Grupos}
* @param {Series}
* @param {UnidadMedida}
* @param {PERIODOS}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ISactGen(ArticuloPresentacion,Bodega,Lote,Ubicacion,Clasificacion,Grupos,Series,UnidadMedida,PERIODOS,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Gruposs,Seriess,UnidadMedidas,PERIODOSs,CodigoLibros;

			var Nombre_Funcion = "ISactGen";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodega","Lote","Ubicacion","Clasificacion","Grupos","Series","UnidadMedida","PERIODOS","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Gruposs = rango_celdas_("Grupos", Grupos);
			Seriess = rango_celdas_("Series", Series);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegas,Lotes,Ubicacions,Clasificacions,Gruposs,Seriess,UnidadMedidas,PERIODOSs,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MTiqueteadorFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MTiqueteadorFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MVendedorFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MVendedorFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MClienteFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MClienteFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MSucursalFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MSucursalFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MImplanteFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MImplanteFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MArchivoFisicoFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MArchivoFisicoFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MCenCostoFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MCenCostoFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MTCambioUSDFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MTCambioUSDFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MTarifaFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MTarifaFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MIvaFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MIvaFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MOtrosFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MOtrosFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MContadoFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MContadoFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MCreditoFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MCreditoFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {NUMERO}
* @return {Number}.
							 * @customfunction
							 */
function MValorTotalFactura(TIPO,FUENTE,NUMERO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,NUMEROs;

			var Nombre_Funcion = "MValorTotalFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","NUMERO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			NUMEROs = rango_celdas_("NUMERO", NUMERO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,NUMEROs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MNroFacturaTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MNroFacturaTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MFechaTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MFechaTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MEntDistTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MEntDistTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MEntVend(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MEntVend";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MItinerarioTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MItinerarioTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MDestinoTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MDestinoTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MClaseTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MClaseTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MPasajero(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MPasajero";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MEstadoTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MEstadoTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MNacionalidadTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MNacionalidadTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @param {CARGO}
* @return {Number}.
							 * @customfunction
							 */
function MCargosTiquete(TIQUETE,CARGO){
			var FECHA_ACTUALs,TIQUETEs,CARGOs;

			var Nombre_Funcion = "MCargosTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE","CARGO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			CARGOs = rango_celdas_("CARGO", CARGO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs,CARGOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @param {IMPUESTO}
* @return {Number}.
							 * @customfunction
							 */
function MImpuestosTiquete(TIQUETE,IMPUESTO){
			var FECHA_ACTUALs,TIQUETEs,IMPUESTOs;

			var Nombre_Funcion = "MImpuestosTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE","IMPUESTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			IMPUESTOs = rango_celdas_("IMPUESTO", IMPUESTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs,IMPUESTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @param {COMISION}
* @return {Number}.
							 * @customfunction
							 */
function MComisionesTiquete(TIQUETE,COMISION){
			var FECHA_ACTUALs,TIQUETEs,COMISIONs;

			var Nombre_Funcion = "MComisionesTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE","COMISION"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			COMISIONs = rango_celdas_("COMISION", COMISION);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs,COMISIONs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @param {COMISION}
* @param {IMPUESTO}
* @return {Number}.
							 * @customfunction
							 */
function MImpComisionesTiquete(TIQUETE,COMISION,IMPUESTO){
			var FECHA_ACTUALs,TIQUETEs,COMISIONs,IMPUESTOs;

			var Nombre_Funcion = "MImpComisionesTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE","COMISION","IMPUESTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			COMISIONs = rango_celdas_("COMISION", COMISION);
			IMPUESTOs = rango_celdas_("IMPUESTO", IMPUESTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs,COMISIONs,IMPUESTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @param {COMISION}
* @return {Number}.
							 * @customfunction
							 */
function MPorComisionTiquete(TIQUETE,COMISION){
			var FECHA_ACTUALs,TIQUETEs,COMISIONs;

			var Nombre_Funcion = "MPorComisionTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE","COMISION"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			COMISIONs = rango_celdas_("COMISION", COMISION);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs,COMISIONs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @param {COMISION}
* @param {IMPUESTO}
* @return {Number}.
							 * @customfunction
							 */
function MPorImpComision(TIQUETE,COMISION,IMPUESTO){
			var FECHA_ACTUALs,TIQUETEs,COMISIONs,IMPUESTOs;

			var Nombre_Funcion = "MPorImpComision";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE","COMISION","IMPUESTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			COMISIONs = rango_celdas_("COMISION", COMISION);
			IMPUESTOs = rango_celdas_("IMPUESTO", IMPUESTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs,COMISIONs,IMPUESTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MContadoTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MContadoTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MCreditoTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MCreditoTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MValorTotalTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MValorTotalTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MTAOTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MTAOTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @return {Number}.
							 * @customfunction
							 */
function MIVATAOTiquete(TIQUETE){
			var FECHA_ACTUALs,TIQUETEs;

			var Nombre_Funcion = "MIVATAOTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {nacionalidad}
* @param {anulacion}
* @param {remision}
* @param {fecha_inicial}
* @param {fecha_final}
* @param {Sucursal}
* @param {Implante}
* @param {Cliente}
* @return {Number}.
							 * @customfunction
							 */
function MVentasCliente(nacionalidad,anulacion,remision,fecha_inicial,fecha_final,Sucursal,Implante,Cliente){
			var FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,Clientes;

			var Nombre_Funcion = "MVentasCliente";
			var Nombre_Parametros = ["FECHA_ACTUAL","nacionalidad","anulacion","remision","fecha_inicial","fecha_final","Sucursal","Implante","Cliente"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			nacionalidads = rango_celdas_("nacionalidad", nacionalidad);
			anulacions = rango_celdas_("anulacion", anulacion);
			remisions = rango_celdas_("remision", remision);
			fecha_inicials = rango_celdas_("fecha_inicial", fecha_inicial);
			fecha_finals = rango_celdas_("fecha_final", fecha_final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			Clientes = rango_celdas_("Cliente", Cliente);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,Clientes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {nacionalidad}
* @param {anulacion}
* @param {remision}
* @param {fecha_inicial}
* @param {fecha_final}
* @param {Sucursal}
* @param {Implante}
* @param {vendedor}
* @return {Number}.
							 * @customfunction
							 */
function MVentasVendedor(nacionalidad,anulacion,remision,fecha_inicial,fecha_final,Sucursal,Implante,vendedor){
			var FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,vendedors;

			var Nombre_Funcion = "MVentasVendedor";
			var Nombre_Parametros = ["FECHA_ACTUAL","nacionalidad","anulacion","remision","fecha_inicial","fecha_final","Sucursal","Implante","vendedor"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			nacionalidads = rango_celdas_("nacionalidad", nacionalidad);
			anulacions = rango_celdas_("anulacion", anulacion);
			remisions = rango_celdas_("remision", remision);
			fecha_inicials = rango_celdas_("fecha_inicial", fecha_inicial);
			fecha_finals = rango_celdas_("fecha_final", fecha_final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			vendedors = rango_celdas_("vendedor", vendedor);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,vendedors]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {nacionalidad}
* @param {anulacion}
* @param {remision}
* @param {fecha_inicial}
* @param {fecha_final}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MVentasSucursal(nacionalidad,anulacion,remision,fecha_inicial,fecha_final,Sucursal,Implante){
			var FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes;

			var Nombre_Funcion = "MVentasSucursal";
			var Nombre_Parametros = ["FECHA_ACTUAL","nacionalidad","anulacion","remision","fecha_inicial","fecha_final","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			nacionalidads = rango_celdas_("nacionalidad", nacionalidad);
			anulacions = rango_celdas_("anulacion", anulacion);
			remisions = rango_celdas_("remision", remision);
			fecha_inicials = rango_celdas_("fecha_inicial", fecha_inicial);
			fecha_finals = rango_celdas_("fecha_final", fecha_final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {nacionalidad}
* @param {anulacion}
* @param {remision}
* @param {fecha_inicial}
* @param {fecha_final}
* @param {Sucursal}
* @param {Implante}
* @param {proveedor}
* @return {Number}.
							 * @customfunction
							 */
function MVentasProveedor(nacionalidad,anulacion,remision,fecha_inicial,fecha_final,Sucursal,Implante,proveedor){
			var FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,proveedors;

			var Nombre_Funcion = "MVentasProveedor";
			var Nombre_Parametros = ["FECHA_ACTUAL","nacionalidad","anulacion","remision","fecha_inicial","fecha_final","Sucursal","Implante","proveedor"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			nacionalidads = rango_celdas_("nacionalidad", nacionalidad);
			anulacions = rango_celdas_("anulacion", anulacion);
			remisions = rango_celdas_("remision", remision);
			fecha_inicials = rango_celdas_("fecha_inicial", fecha_inicial);
			fecha_finals = rango_celdas_("fecha_final", fecha_final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			proveedors = rango_celdas_("proveedor", proveedor);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,proveedors]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {nacionalidad}
* @param {anulacion}
* @param {remision}
* @param {fecha_inicial}
* @param {fecha_final}
* @param {Sucursal}
* @param {Implante}
* @param {Tiqueteador}
* @return {Number}.
							 * @customfunction
							 */
function MVentasTiqueteador(nacionalidad,anulacion,remision,fecha_inicial,fecha_final,Sucursal,Implante,Tiqueteador){
			var FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,Tiqueteadors;

			var Nombre_Funcion = "MVentasTiqueteador";
			var Nombre_Parametros = ["FECHA_ACTUAL","nacionalidad","anulacion","remision","fecha_inicial","fecha_final","Sucursal","Implante","Tiqueteador"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			nacionalidads = rango_celdas_("nacionalidad", nacionalidad);
			anulacions = rango_celdas_("anulacion", anulacion);
			remisions = rango_celdas_("remision", remision);
			fecha_inicials = rango_celdas_("fecha_inicial", fecha_inicial);
			fecha_finals = rango_celdas_("fecha_final", fecha_final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			Tiqueteadors = rango_celdas_("Tiqueteador", Tiqueteador);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes,Tiqueteadors]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {nacionalidad}
* @param {anulacion}
* @param {remision}
* @param {fecha_inicial}
* @param {fecha_final}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MVentasTAO(nacionalidad,anulacion,remision,fecha_inicial,fecha_final,Sucursal,Implante){
			var FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes;

			var Nombre_Funcion = "MVentasTAO";
			var Nombre_Parametros = ["FECHA_ACTUAL","nacionalidad","anulacion","remision","fecha_inicial","fecha_final","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			nacionalidads = rango_celdas_("nacionalidad", nacionalidad);
			anulacions = rango_celdas_("anulacion", anulacion);
			remisions = rango_celdas_("remision", remision);
			fecha_inicials = rango_celdas_("fecha_inicial", fecha_inicial);
			fecha_finals = rango_celdas_("fecha_final", fecha_final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,nacionalidads,anulacions,remisions,fecha_inicials,fecha_finals,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {TIPOMOV}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {TIPO_ACUMULADO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovpDiapAcu(CUENTAS,TIPOMOV,FECHA_INICIAL,FECHA_FINAL,TIPO_ACUMULADO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,TIPOMOVs,FECHA_INICIALs,FECHA_FINALs,TIPO_ACUMULADOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovpDiapAcu";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","TIPOMOV","FECHA_INICIAL","FECHA_FINAL","TIPO_ACUMULADO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			TIPO_ACUMULADOs = rango_celdas_("TIPO_ACUMULADO", TIPO_ACUMULADO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,TIPOMOVs,FECHA_INICIALs,FECHA_FINALs,TIPO_ACUMULADOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FUENTE}
* @param {DOCUMENTO}
* @return {Number}.
							 * @customfunction
							 */
function MEstadoFactura(TIPO,FUENTE,DOCUMENTO){
			var FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs;

			var Nombre_Funcion = "MEstadoFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FUENTE","DOCUMENTO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			DOCUMENTOs = rango_celdas_("DOCUMENTO", DOCUMENTO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FUENTEs,DOCUMENTOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {Bodegas}
* @param {Lotes}
* @param {Ubicaciones}
* @param {Clasificaciones}
* @param {Grupos}
* @param {Seriales}
* @param {UnidadMedida}
* @param {Fecha_Info}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IInvInicial(ArticuloPresentacion,Bodegas,Lotes,Ubicaciones,Clasificaciones,Grupos,Seriales,UnidadMedida,Fecha_Info,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,Bodegass,Lotess,Ubicacioness,Clasificacioness,Gruposs,Serialess,UnidadMedidas,Fecha_Infos,CodigoLibros;

			var Nombre_Funcion = "IInvInicial";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","Bodegas","Lotes","Ubicaciones","Clasificaciones","Grupos","Seriales","UnidadMedida","Fecha_Info","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegass = rango_celdas_("Bodegas", Bodegas);
			Lotess = rango_celdas_("Lotes", Lotes);
			Ubicacioness = rango_celdas_("Ubicaciones", Ubicaciones);
			Clasificacioness = rango_celdas_("Clasificaciones", Clasificaciones);
			Gruposs = rango_celdas_("Grupos", Grupos);
			Serialess = rango_celdas_("Seriales", Seriales);
			UnidadMedidas = rango_celdas_("UnidadMedida", UnidadMedida);
			Fecha_Infos = rango_celdas_("Fecha_Info", Fecha_Info);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,Bodegass,Lotess,Ubicacioness,Clasificacioness,Gruposs,Serialess,UnidadMedidas,Fecha_Infos,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {ArticuloPresentacion}
* @param {BodegaOrigen}
* @param {BodegaDestino}
* @param {Lote}
* @param {Ubicacion}
* @param {Clasificacion}
* @param {Grupo}
* @param {Fuente}
* @param {FechaI}
* @param {FechaF}
* @param {TipoResultado}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function ITrasladoDosBodega(ArticuloPresentacion,BodegaOrigen,BodegaDestino,Lote,Ubicacion,Clasificacion,Grupo,Fuente,FechaI,FechaF,TipoResultado,CodigoLibro){
			var FECHA_ACTUALs,ArticuloPresentacions,BodegaOrigens,BodegaDestinos,Lotes,Ubicacions,Clasificacions,Grupos,Fuentes,FechaIs,FechaFs,TipoResultados,CodigoLibros;

			var Nombre_Funcion = "ITrasladoDosBodega";
			var Nombre_Parametros = ["FECHA_ACTUAL","ArticuloPresentacion","BodegaOrigen","BodegaDestino","Lote","Ubicacion","Clasificacion","Grupo","Fuente","FechaI","FechaF","TipoResultado","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			BodegaOrigens = rango_celdas_("BodegaOrigen", BodegaOrigen);
			BodegaDestinos = rango_celdas_("BodegaDestino", BodegaDestino);
			Lotes = rango_celdas_("Lote", Lote);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			Clasificacions = rango_celdas_("Clasificacion", Clasificacion);
			Grupos = rango_celdas_("Grupo", Grupo);
			Fuentes = rango_celdas_("Fuente", Fuente);
			FechaIs = rango_celdas_("FechaI", FechaI);
			FechaFs = rango_celdas_("FechaF", FechaF);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,ArticuloPresentacions,BodegaOrigens,BodegaDestinos,Lotes,Ubicacions,Clasificacions,Grupos,Fuentes,FechaIs,FechaFs,TipoResultados,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTAO_PAX_NAC(TIPO,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTAO_PAX_NAC";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTAO_VENTAS_NAC(TIPO,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTAO_VENTAS_NAC";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {TarifaInferior}
* @param {TarifaSuperior}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTAO_PAX_INT(TIPO,TarifaInferior,TarifaSuperior,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTAO_PAX_INT";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","TarifaInferior","TarifaSuperior","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			TarifaInferiors = rango_celdas_("TarifaInferior", TarifaInferior);
			TarifaSuperiors = rango_celdas_("TarifaSuperior", TarifaSuperior);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TarifaInferior}
* @param {TarifaSuperior}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTAO_VENTAS_INT(TarifaInferior,TarifaSuperior,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTAO_VENTAS_INT";
			var Nombre_Parametros = ["FECHA_ACTUAL","TarifaInferior","TarifaSuperior","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TarifaInferiors = rango_celdas_("TarifaInferior", TarifaInferior);
			TarifaSuperiors = rango_celdas_("TarifaSuperior", TarifaSuperior);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MCEMISION_PAX_NAC(TIPO,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MCEMISION_PAX_NAC";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MCEMISION_VENTAS_NAC(TIPO,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MCEMISION_VENTAS_NAC";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TarifaInferior}
* @param {TarifaSuperior}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MCEMISION_PAX_INT(TarifaInferior,TarifaSuperior,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MCEMISION_PAX_INT";
			var Nombre_Parametros = ["FECHA_ACTUAL","TarifaInferior","TarifaSuperior","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TarifaInferiors = rango_celdas_("TarifaInferior", TarifaInferior);
			TarifaSuperiors = rango_celdas_("TarifaSuperior", TarifaSuperior);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TarifaInferior}
* @param {TarifaSuperior}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MCEMISION_VENTAS_INT(TarifaInferior,TarifaSuperior,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MCEMISION_VENTAS_INT";
			var Nombre_Parametros = ["FECHA_ACTUAL","TarifaInferior","TarifaSuperior","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TarifaInferiors = rango_celdas_("TarifaInferior", TarifaInferior);
			TarifaSuperiors = rango_celdas_("TarifaSuperior", TarifaSuperior);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPOSERV}
* @param {NACIONALIDAD}
* @param {CARGO}
* @param {ES_IMPUESTO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {SUCURSAL}
* @param {IMPLANTE}
* @return {Number}.
							 * @customfunction
							 */
function MTOTAL_X_TIPOSERV(TIPOSERV,NACIONALIDAD,CARGO,ES_IMPUESTO,FECHA_INICIAL,FECHA_FINAL,SUCURSAL,IMPLANTE){
			var FECHA_ACTUALs,TIPOSERVs,NACIONALIDADs,CARGOs,ES_IMPUESTOs,FECHA_INICIALs,FECHA_FINALs,SUCURSALs,IMPLANTEs;

			var Nombre_Funcion = "MTOTAL_X_TIPOSERV";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPOSERV","NACIONALIDAD","CARGO","ES_IMPUESTO","FECHA_INICIAL","FECHA_FINAL","SUCURSAL","IMPLANTE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOSERVs = rango_celdas_("TIPOSERV", TIPOSERV);
			NACIONALIDADs = rango_celdas_("NACIONALIDAD", NACIONALIDAD);
			CARGOs = rango_celdas_("CARGO", CARGO);
			ES_IMPUESTOs = rango_celdas_("ES_IMPUESTO", ES_IMPUESTO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			SUCURSALs = rango_celdas_("SUCURSAL", SUCURSAL);
			IMPLANTEs = rango_celdas_("IMPLANTE", IMPLANTE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOSERVs,NACIONALIDADs,CARGOs,ES_IMPUESTOs,FECHA_INICIALs,FECHA_FINALs,SUCURSALs,IMPLANTEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPOCONCEPT}
* @param {NACIONALIDAD}
* @param {CARGO}
* @param {ES_IMPUESTO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {SUCURSAL}
* @param {IMPLANTE}
* @return {Number}.
							 * @customfunction
							 */
function MTOTAL_X_TIPOCONCEPT(TIPOCONCEPT,NACIONALIDAD,CARGO,ES_IMPUESTO,FECHA_INICIAL,FECHA_FINAL,SUCURSAL,IMPLANTE){
			var FECHA_ACTUALs,TIPOCONCEPTs,NACIONALIDADs,CARGOs,ES_IMPUESTOs,FECHA_INICIALs,FECHA_FINALs,SUCURSALs,IMPLANTEs;

			var Nombre_Funcion = "MTOTAL_X_TIPOCONCEPT";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPOCONCEPT","NACIONALIDAD","CARGO","ES_IMPUESTO","FECHA_INICIAL","FECHA_FINAL","SUCURSAL","IMPLANTE"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOCONCEPTs = rango_celdas_("TIPOCONCEPT", TIPOCONCEPT);
			NACIONALIDADs = rango_celdas_("NACIONALIDAD", NACIONALIDAD);
			CARGOs = rango_celdas_("CARGO", CARGO);
			ES_IMPUESTOs = rango_celdas_("ES_IMPUESTO", ES_IMPUESTO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			SUCURSALs = rango_celdas_("SUCURSAL", SUCURSAL);
			IMPLANTEs = rango_celdas_("IMPLANTE", IMPLANTE);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOCONCEPTs,NACIONALIDADs,CARGOs,ES_IMPUESTOs,FECHA_INICIALs,FECHA_FINALs,SUCURSALs,IMPLANTEs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTAO_TARIFA_NAC(TIPO,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTAO_TARIFA_NAC";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {TarifaInferior}
* @param {TarifaSuperior}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTAO_TARIFA_INT(TIPO,TarifaInferior,TarifaSuperior,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTAO_TARIFA_INT";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","TarifaInferior","TarifaSuperior","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			TarifaInferiors = rango_celdas_("TarifaInferior", TarifaInferior);
			TarifaSuperiors = rango_celdas_("TarifaSuperior", TarifaSuperior);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTKT_TARIFA_NAC(TIPO,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTKT_TARIFA_NAC";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIPO}
* @param {TarifaInferior}
* @param {TarifaSuperior}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @return {Number}.
							 * @customfunction
							 */
function MTKT_TARIFA_INT(TIPO,TarifaInferior,TarifaSuperior,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante){
			var FECHA_ACTUALs,TIPOs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes;

			var Nombre_Funcion = "MTKT_TARIFA_INT";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIPO","TarifaInferior","TarifaSuperior","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIPOs = rango_celdas_("TIPO", TIPO);
			TarifaInferiors = rango_celdas_("TarifaInferior", TarifaInferior);
			TarifaSuperiors = rango_celdas_("TarifaSuperior", TarifaSuperior);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIPOs,TarifaInferiors,TarifaSuperiors,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TipoEjecucion}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {Sucursal}
* @param {Implante}
* @param {Cliente}
* @param {Vendedor}
* @param {Tiqueteador}
* @return {Number}.
							 * @customfunction
							 */
function MDZQ_MFacturasListado(TipoEjecucion,FECHA_INICIAL,FECHA_FINAL,Sucursal,Implante,Cliente,Vendedor,Tiqueteador){
			var FECHA_ACTUALs,TipoEjecucions,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes,Clientes,Vendedors,Tiqueteadors;

			var Nombre_Funcion = "MDZQ_MFacturasListado";
			var Nombre_Parametros = ["FECHA_ACTUAL","TipoEjecucion","FECHA_INICIAL","FECHA_FINAL","Sucursal","Implante","Cliente","Vendedor","Tiqueteador"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TipoEjecucions = rango_celdas_("TipoEjecucion", TipoEjecucion);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			Clientes = rango_celdas_("Cliente", Cliente);
			Vendedors = rango_celdas_("Vendedor", Vendedor);
			Tiqueteadors = rango_celdas_("Tiqueteador", Tiqueteador);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TipoEjecucions,FECHA_INICIALs,FECHA_FINALs,Sucursals,Implantes,Clientes,Vendedors,Tiqueteadors]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovFuente(CUENTAS,FUENTE,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovFuente";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}

/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovFuenteDia(CUENTAS,FUENTE,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovFuenteDia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovFuenteDiaP(CUENTAS,FUENTE,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovFuenteDiaP";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}

/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {TipoDocumento}
* @param {IndDbCr}
* @param {Fuente}
* @param {FechaI}
* @param {FechaF}
* @param {Estado}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpArticuloxTdFUni(ArticuloPresentacion,Bodega,Ubicacion,TipoDocumento,IndDbCr,Fuente,FechaI,FechaF,Estado,ParamAdi,CodigoLibro){
			var Fecha_Actuals,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Fuentes,FechaIs,FechaFs,Estados,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpArticuloxTdFUni";
			var Nombre_Parametros = ["Fecha_Actual","ArticuloPresentacion","Bodega","Ubicacion","TipoDocumento","IndDbCr","Fuente","FechaI","FechaF","Estado","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			IndDbCrs = rango_celdas_("IndDbCr", IndDbCr);
			Fuentes = rango_celdas_("Fuente", Fuente);
			FechaIs = rango_celdas_("FechaI", FechaI);
			FechaFs = rango_celdas_("FechaF", FechaF);
			Estados = rango_celdas_("Estado", Estado);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Fuentes,FechaIs,FechaFs,Estados,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}

/**
							 * Descripción
							 *
* @param {Fecha_ACtual}
* @param {cd_Tiquete}
* @param {Factura}
* @param {cd_ConceptoFac}
* @param {cd_CargoDesc}
* @param {cd_ImpRet}
* @return {Number}.
							 * @customfunction
							 */
function MCargoImpConcepto(cd_Tiquete,Factura,cd_ConceptoFac,cd_CargoDesc,cd_ImpRet){
			var Fecha_ACtuals,cd_Tiquetes,Facturas,cd_ConceptoFacs,cd_CargoDescs,cd_ImpRets;

			var Nombre_Funcion = "MCargoImpConcepto";
			var Nombre_Parametros = ["Fecha_ACtual","cd_Tiquete","Factura","cd_ConceptoFac","cd_CargoDesc","cd_ImpRet"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			cd_Tiquetes = rango_celdas_("cd_Tiquete", cd_Tiquete);
			Facturas = rango_celdas_("Factura", Factura);
			cd_ConceptoFacs = rango_celdas_("cd_ConceptoFac", cd_ConceptoFac);
			cd_CargoDescs = rango_celdas_("cd_CargoDesc", cd_CargoDesc);
			cd_ImpRets = rango_celdas_("cd_ImpRet", cd_ImpRet);
			
			var Valores_Parametros = rango_parametros_([Fecha_ACtuals,cd_Tiquetes,Facturas,cd_ConceptoFacs,cd_CargoDescs,cd_ImpRets]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {ArticuloPresentacion}
* @param {Bodega}
* @param {Ubicacion}
* @param {TipoDocumento}
* @param {IndDbCr}
* @param {Fuente}
* @param {FechaI}
* @param {FechaF}
* @param {Estado}
* @param {ParamAdi}
* @param {CodigoLibro}
* @return {Number}.
							 * @customfunction
							 */
function IMovpArticuloxTdF(ArticuloPresentacion,Bodega,Ubicacion,TipoDocumento,IndDbCr,Fuente,FechaI,FechaF,Estado,ParamAdi,CodigoLibro){
			var Fecha_Actuals,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Fuentes,FechaIs,FechaFs,Estados,ParamAdis,CodigoLibros;

			var Nombre_Funcion = "IMovpArticuloxTdF";
			var Nombre_Parametros = ["Fecha_Actual","ArticuloPresentacion","Bodega","Ubicacion","TipoDocumento","IndDbCr","Fuente","FechaI","FechaF","Estado","ParamAdi","CodigoLibro"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			ArticuloPresentacions = rango_celdas_("ArticuloPresentacion", ArticuloPresentacion);
			Bodegas = rango_celdas_("Bodega", Bodega);
			Ubicacions = rango_celdas_("Ubicacion", Ubicacion);
			TipoDocumentos = rango_celdas_("TipoDocumento", TipoDocumento);
			IndDbCrs = rango_celdas_("IndDbCr", IndDbCr);
			Fuentes = rango_celdas_("Fuente", Fuente);
			FechaIs = rango_celdas_("FechaI", FechaI);
			FechaFs = rango_celdas_("FechaF", FechaF);
			Estados = rango_celdas_("Estado", Estado);
			ParamAdis = rango_celdas_("ParamAdi", ParamAdi);
			CodigoLibros = rango_celdas_("CodigoLibro", CodigoLibro);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,ArticuloPresentacions,Bodegas,Ubicacions,TipoDocumentos,IndDbCrs,Fuentes,FechaIs,FechaFs,Estados,ParamAdis,CodigoLibros]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {TIQUETE}
* @param {CAMPO}
* @return {Number}.
							 * @customfunction
							 */
function MCampoTiquete(TIQUETE,CAMPO){
			var FECHA_ACTUALs,TIQUETEs,CAMPOs;

			var Nombre_Funcion = "MCampoTiquete";
			var Nombre_Parametros = ["FECHA_ACTUAL","TIQUETE","CAMPO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			TIQUETEs = rango_celdas_("TIQUETE", TIQUETE);
			CAMPOs = rango_celdas_("CAMPO", CAMPO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,TIQUETEs,CAMPOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Nacionalidad}
* @param {Anulacion}
* @param {Remision}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Sucursal}
* @param {Implante}
* @param {Cliente}
* @param {Aerolinea}
* @return {Number}.
							 * @customfunction
							 */
function mVentasClienteAerolinea(Nacionalidad,Anulacion,Remision,Fecha_Inicial,Fecha_Final,Sucursal,Implante,Cliente,Aerolinea){
			var FECHA_ACTUALs,Nacionalidads,Anulacions,Remisions,Fecha_Inicials,Fecha_Finals,Sucursals,Implantes,Clientes,Aerolineas;

			var Nombre_Funcion = "mVentasClienteAerolinea";
			var Nombre_Parametros = ["FECHA_ACTUAL","Nacionalidad","Anulacion","Remision","Fecha_Inicial","Fecha_Final","Sucursal","Implante","Cliente","Aerolinea"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Nacionalidads = rango_celdas_("Nacionalidad", Nacionalidad);
			Anulacions = rango_celdas_("Anulacion", Anulacion);
			Remisions = rango_celdas_("Remision", Remision);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			Clientes = rango_celdas_("Cliente", Cliente);
			Aerolineas = rango_celdas_("Aerolinea", Aerolinea);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Nacionalidads,Anulacions,Remisions,Fecha_Inicials,Fecha_Finals,Sucursals,Implantes,Clientes,Aerolineas]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Factura}
* @param {CAMPO}
* @return {Number}.
							 * @customfunction
							 */
function MCampoFactura(Factura,CAMPO){
			var FECHA_ACTUALs,Facturas,CAMPOs;

			var Nombre_Funcion = "MCampoFactura";
			var Nombre_Parametros = ["FECHA_ACTUAL","Factura","CAMPO"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Facturas = rango_celdas_("Factura", Factura);
			CAMPOs = rango_celdas_("CAMPO", CAMPO);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Facturas,CAMPOs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {Cliente}
* @param {TipoFac}
* @param {NumeFac}
* @param {VenceFac}
* @param {RefeFac}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KFactUltimoDocCR(CUENTAS,Cliente,TipoFac,NumeFac,VenceFac,RefeFac,BU){
			var FECHA_ACTUALs,CUENTASs,Clientes,TipoFacs,NumeFacs,VenceFacs,RefeFacs,BUs;

			var Nombre_Funcion = "KFactUltimoDocCR";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","Cliente","TipoFac","NumeFac","VenceFac","RefeFac","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			Clientes = rango_celdas_("Cliente", Cliente);
			TipoFacs = rango_celdas_("TipoFac", TipoFac);
			NumeFacs = rango_celdas_("NumeFac", NumeFac);
			VenceFacs = rango_celdas_("VenceFac", VenceFac);
			RefeFacs = rango_celdas_("RefeFac", RefeFac);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,Clientes,TipoFacs,NumeFacs,VenceFacs,RefeFacs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Nacionalidad}
* @param {Anulacion}
* @param {Remision}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Sucursal}
* @param {Implante}
* @param {Cliente}
* @param {Aerolinea}
* @param {Clase}
* @return {Number}.
							 * @customfunction
							 */
function mTotalTiquetesClienteAerolineaClase(Nacionalidad,Anulacion,Remision,Fecha_Inicial,Fecha_Final,Sucursal,Implante,Cliente,Aerolinea,Clase){
			var FECHA_ACTUALs,Nacionalidads,Anulacions,Remisions,Fecha_Inicials,Fecha_Finals,Sucursals,Implantes,Clientes,Aerolineas,Clases;

			var Nombre_Funcion = "mTotalTiquetesClienteAerolineaClase";
			var Nombre_Parametros = ["FECHA_ACTUAL","Nacionalidad","Anulacion","Remision","Fecha_Inicial","Fecha_Final","Sucursal","Implante","Cliente","Aerolinea","Clase"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Nacionalidads = rango_celdas_("Nacionalidad", Nacionalidad);
			Anulacions = rango_celdas_("Anulacion", Anulacion);
			Remisions = rango_celdas_("Remision", Remision);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			Clientes = rango_celdas_("Cliente", Cliente);
			Aerolineas = rango_celdas_("Aerolinea", Aerolinea);
			Clases = rango_celdas_("Clase", Clase);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Nacionalidads,Anulacions,Remisions,Fecha_Inicials,Fecha_Finals,Sucursals,Implantes,Clientes,Aerolineas,Clases]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {Nacionalidad}
* @param {Anulacion}
* @param {Remision}
* @param {Fecha_Inicial}
* @param {Fecha_Final}
* @param {Sucursal}
* @param {Implante}
* @param {Cliente}
* @param {Servicios}
* @return {Number}.
							 * @customfunction
							 */
function mVentasClienteServicios(Nacionalidad,Anulacion,Remision,Fecha_Inicial,Fecha_Final,Sucursal,Implante,Cliente,Servicios){
			var FECHA_ACTUALs,Nacionalidads,Anulacions,Remisions,Fecha_Inicials,Fecha_Finals,Sucursals,Implantes,Clientes,Servicioss;

			var Nombre_Funcion = "mVentasClienteServicios";
			var Nombre_Parametros = ["FECHA_ACTUAL","Nacionalidad","Anulacion","Remision","Fecha_Inicial","Fecha_Final","Sucursal","Implante","Cliente","Servicios"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			Nacionalidads = rango_celdas_("Nacionalidad", Nacionalidad);
			Anulacions = rango_celdas_("Anulacion", Anulacion);
			Remisions = rango_celdas_("Remision", Remision);
			Fecha_Inicials = rango_celdas_("Fecha_Inicial", Fecha_Inicial);
			Fecha_Finals = rango_celdas_("Fecha_Final", Fecha_Final);
			Sucursals = rango_celdas_("Sucursal", Sucursal);
			Implantes = rango_celdas_("Implante", Implante);
			Clientes = rango_celdas_("Cliente", Cliente);
			Servicioss = rango_celdas_("Servicios", Servicios);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,Nacionalidads,Anulacions,Remisions,Fecha_Inicials,Fecha_Finals,Sucursals,Implantes,Clientes,Servicioss]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {Cliente}
* @param {TipoFac}
* @param {NumeFac}
* @param {VenceFac}
* @param {RefeFac}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KFactUltimoPago(CUENTAS,Cliente,TipoFac,NumeFac,VenceFac,RefeFac,BU){
			var FECHA_ACTUALs,CUENTASs,Clientes,TipoFacs,NumeFacs,VenceFacs,RefeFacs,BUs;

			var Nombre_Funcion = "KFactUltimoPago";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","Cliente","TipoFac","NumeFac","VenceFac","RefeFac","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			Clientes = rango_celdas_("Cliente", Cliente);
			TipoFacs = rango_celdas_("TipoFac", TipoFac);
			NumeFacs = rango_celdas_("NumeFac", NumeFac);
			VenceFacs = rango_celdas_("VenceFac", VenceFac);
			RefeFacs = rango_celdas_("RefeFac", RefeFac);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,Clientes,TipoFacs,NumeFacs,VenceFacs,RefeFacs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactCorto(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactCorto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactLargo(CUENTAS,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactLargo";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactprvCorto(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactprvCorto";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactprvLargo(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactprvLargo";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {Fecha_Actual}
* @param {CentrosCostos}
* @param {TipoResultado}
* @param {Mostrar}
* @param {PERIODOS}
* @return {Number}.
							 * @customfunction
							 */
function NmCantEmplCto(CentrosCostos,TipoResultado,Mostrar,PERIODOS){
			var Fecha_Actuals,CentrosCostoss,TipoResultados,Mostrars,PERIODOSs;

			var Nombre_Funcion = "NmCantEmplCto";
			var Nombre_Parametros = ["Fecha_Actual","CentrosCostos","TipoResultado","Mostrar","PERIODOS"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CentrosCostoss = rango_celdas_("CentrosCostos", CentrosCostos);
			TipoResultados = rango_celdas_("TipoResultado", TipoResultado);
			Mostrars = rango_celdas_("Mostrar", Mostrar);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			
			var Valores_Parametros = rango_parametros_([Fecha_Actuals,CentrosCostoss,TipoResultados,Mostrars,PERIODOSs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactProp1(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactProp1";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactProp2(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactProp2";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactProp3(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactProp3";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactProp5(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactProp5";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactProp4(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactProp4";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp1Dia(CUENTAS,CODIGOATRIBUTO,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp1Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp2Dia(CUENTAS,CODIGOATRIBUTO,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp2Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp3Dia(CUENTAS,CODIGOATRIBUTO,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp3Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp4Dia(CUENTAS,CODIGOATRIBUTO,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp4Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp5Dia(CUENTAS,CODIGOATRIBUTO,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp5Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp1Dia(CUENTAS,CODIGOATRIBUTO,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs;

			var Nombre_Funcion = "KSactProp1Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp2Dia(CUENTAS,CODIGOATRIBUTO,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs;

			var Nombre_Funcion = "KSactProp2Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp3Dia(CUENTAS,CODIGOATRIBUTO,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs;

			var Nombre_Funcion = "KSactProp3Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp4Dia(CUENTAS,CODIGOATRIBUTO,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs;

			var Nombre_Funcion = "KSactProp4Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp5Dia(CUENTAS,CODIGOATRIBUTO,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs;

			var Nombre_Funcion = "KSactProp5Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {GRUPO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp1Gru(CUENTAS,CODIGOATRIBUTO,GRUPO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp1Gru";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","GRUPO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			GRUPOs = rango_celdas_("GRUPO", GRUPO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {GRUPO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp2Gru(CUENTAS,CODIGOATRIBUTO,GRUPO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp2Gru";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","GRUPO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			GRUPOs = rango_celdas_("GRUPO", GRUPO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {GRUPO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp3Gru(CUENTAS,CODIGOATRIBUTO,GRUPO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp3Gru";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","GRUPO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			GRUPOs = rango_celdas_("GRUPO", GRUPO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {GRUPO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp4Gru(CUENTAS,CODIGOATRIBUTO,GRUPO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp4Gru";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","GRUPO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			GRUPOs = rango_celdas_("GRUPO", GRUPO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {GRUPO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp5Gru(CUENTAS,CODIGOATRIBUTO,GRUPO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp5Gru";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","GRUPO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			GRUPOs = rango_celdas_("GRUPO", GRUPO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,GRUPOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp1(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp1";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp2(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp2";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp3(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp3";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp4(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp4";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactMProp5(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactMProp5";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp1Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactProp1Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp2Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactProp2Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp3Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactProp3Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp4Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactProp4Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KSactProp5Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KSactProp5Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp1Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp1Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp2Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp2Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp3Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp3Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp4Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp4Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp5Uni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp5Uni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp1DbUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp1DbUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp2DbUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp2DbUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp3DbUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp3DbUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp4DbUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp4DbUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp5DbUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp5DbUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp1CrUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp1CrUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp2CrUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp2CrUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp3CrUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp3CrUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp4CrUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp4CrUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp5CrUni(CUENTAS,CODIGOATRIBUTO,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp5CrUni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp1(CUENTAS,CODIGOATRIBUTO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp1";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp2(CUENTAS,CODIGOATRIBUTO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp2";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp3(CUENTAS,CODIGOATRIBUTO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp3";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp4(CUENTAS,CODIGOATRIBUTO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp4";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp5(CUENTAS,CODIGOATRIBUTO,TIPOMOV,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp5";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovProp1(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovProp1";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovProp2(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovProp2";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovProp3(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovProp3";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovProp4(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovProp4";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovProp5(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovProp5";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp1Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp1Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp2Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp2Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp3Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp3Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp4Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp4Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp5Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp5Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp1Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp1Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp2Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp2Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp3Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp3Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp4Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp4Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp5Dia(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp5Dia";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp1Db(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp1Db";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp2Db(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp2Db";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp3Db(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp3Db";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp4Db(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp4Db";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp5Db(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp5Db";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp1Cr(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp1Cr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp2Cr(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp2Cr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp3Cr(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp3Cr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp4Cr(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp4Cr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovProp5Cr(CUENTAS,CODIGOATRIBUTO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovProp5Cr";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp1Diap(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp1Diap";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp2Diap(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp2Diap";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp3Diap(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp3Diap";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp4Diap(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp4Diap";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {CODIGOATRIBUTO}
* @param {TIPOMOV}
* @param {FECHA}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovMProp5Diap(CUENTAS,CODIGOATRIBUTO,TIPOMOV,FECHA,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovMProp5Diap";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","CODIGOATRIBUTO","TIPOMOV","FECHA","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			CODIGOATRIBUTOs = rango_celdas_("CODIGOATRIBUTO", CODIGOATRIBUTO);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAs = rango_celdas_("FECHA", FECHA);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,CODIGOATRIBUTOs,TIPOMOVs,FECHAs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {FiltroMaestro}
* @param {Periodos}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function RevelacionSoporteCuenta(FiltroMaestro,Periodos,BU){
			var FECHA_ACTUALs,FiltroMaestros,Periodoss,BUs;

			var Nombre_Funcion = "RevelacionSoporteCuenta";
			var Nombre_Parametros = ["FECHA_ACTUAL","FiltroMaestro","Periodos","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			FiltroMaestros = rango_celdas_("FiltroMaestro", FiltroMaestro);
			Periodoss = rango_celdas_("Periodos", Periodos);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,FiltroMaestros,Periodoss,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {FiltroMaestro}
* @param {Periodos}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function RevelacionSoporteSeccion(FiltroMaestro,Periodos,BU){
			var FECHA_ACTUALs,FiltroMaestros,Periodoss,BUs;

			var Nombre_Funcion = "RevelacionSoporteSeccion";
			var Nombre_Parametros = ["FECHA_ACTUAL","FiltroMaestro","Periodos","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			FiltroMaestros = rango_celdas_("FiltroMaestro", FiltroMaestro);
			Periodoss = rango_celdas_("Periodos", Periodos);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,FiltroMaestros,Periodoss,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactdiauni(CUENTAS,AUXILIAR, FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAs,BUs;

			var Nombre_Funcion = "Ksactdiauni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactCortouni(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactCortouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactLargouni(CUENTAS,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactLargouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovFuenteuni(CUENTAS,FUENTE,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovFuenteuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMOVFUENTECRuni(CUENTAS,FUENTE,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMOVFUENTECRuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovFuenteDBuni(CUENTAS,FUENTE,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovFuenteDBuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {AUXILIAR}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovFuenteDiauni(CUENTAS,FUENTE,AUXILIAR,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovFuenteDiauni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","AUXILIAR","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpdiauni(CUENTAS,AUXILIAR,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpdiauni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {TIPOMOV}
* @param {FECHA_INICIAL}
* @param {FECHA_FINAL}
* @param {TIPO_ACUMULADO}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovpDiapAcuuni(CUENTAS,AUXILIAR,TIPOMOV,FECHA_INICIAL,FECHA_FINAL,TIPO_ACUMULADO,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHA_INICIALs,FECHA_FINALs,TIPO_ACUMULADOs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovpDiapAcuuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","TIPOMOV","FECHA_INICIAL","FECHA_FINAL","TIPO_ACUMULADO","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHA_INICIALs = rango_celdas_("FECHA_INICIAL", FECHA_INICIAL);
			FECHA_FINALs = rango_celdas_("FECHA_FINAL", FECHA_FINAL);
			TIPO_ACUMULADOs = rango_celdas_("TIPO_ACUMULADO", TIPO_ACUMULADO);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHA_INICIALs,FECHA_FINALs,TIPO_ACUMULADOs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovpdiapuni(CUENTAS,AUXILIAR,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovpdiapuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {FUENTE}
* @param {AUXILIAR}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KMovFuenteDiaPuni(CUENTAS,FUENTE,AUXILIAR,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "KMovFuenteDiaPuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","FUENTE","AUXILIAR","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			FUENTEs = rango_celdas_("FUENTE", FUENTE);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,FUENTEs,AUXILIARs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {DIASINI}
* @param {DIASFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kvencuni(CUENTAS,AUXILIAR,DIASINI,DIASFIN,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,DIASINIs,DIASFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kvencuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","DIASINI","DIASFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			DIASINIs = rango_celdas_("DIASINI", DIASINI);
			DIASFINs = rango_celdas_("DIASFIN", DIASFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,DIASINIs,DIASFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {FECHAINI}
* @param {FECHAFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kvencfuni(CUENTAS,AUXILIAR,FECHAINI,FECHAFIN,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAINIs,FECHAFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kvencfuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","FECHAINI","FECHAFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			FECHAINIs = rango_celdas_("FECHAINI", FECHAINI);
			FECHAFINs = rango_celdas_("FECHAFIN", FECHAFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,FECHAINIs,FECHAFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {CLIENTES}
* @param {DIASINI}
* @param {DIASFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kvenccliuni(CUENTAS,AUXILIAR,CLIENTES,DIASINI,DIASFIN,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,CLIENTESs,DIASINIs,DIASFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kvenccliuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","CLIENTES","DIASINI","DIASFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			CLIENTESs = rango_celdas_("CLIENTES", CLIENTES);
			DIASINIs = rango_celdas_("DIASINI", DIASINI);
			DIASFINs = rango_celdas_("DIASFIN", DIASFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,CLIENTESs,DIASINIs,DIASFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {PROVEEDORES}
* @param {DIASINI}
* @param {DIASFIN}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kvencprouni(CUENTAS,AUXILIAR,PROVEEDORES,DIASINI,DIASFIN,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,PROVEEDORESs,DIASINIs,DIASFINs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kvencprouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","PROVEEDORES","DIASINI","DIASFIN","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PROVEEDORESs = rango_celdas_("PROVEEDORES", PROVEEDORES);
			DIASINIs = rango_celdas_("DIASINI", DIASINI);
			DIASFINs = rango_celdas_("DIASFIN", DIASFIN);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,PROVEEDORESs,DIASINIs,DIASFINs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactcliuni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactcliuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactprvuni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "Ksactprvuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovclidbuni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovclidbuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovclicruni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovclicruni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovprvdbuni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovprvdbuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovprvcruni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovprvcruni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactauxdiauni(CUENTAS,AUXILIAR,UNIDADES,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,FECHAs,BUs;

			var Nombre_Funcion = "Ksactauxdiauni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {FECHA}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Ksactctodiauni(CUENTAS,AUXILIAR,UNIDADES,FECHA,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,FECHAs,BUs;

			var Nombre_Funcion = "Ksactctodiauni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","FECHA","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			FECHAs = rango_celdas_("FECHA", FECHA);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,FECHAs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactcliCortouni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactcliCortouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactcliLargouni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactcliLargouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactprvCortouni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactprvCortouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KsactprvLargouni(CUENTAS,AUXILIAR,UNIDADES,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs;

			var Nombre_Funcion = "KsactprvLargouni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctodiauni(CUENTAS,AUXILIAR,UNIDADES,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctodiauni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {AUXILIAR}
* @param {UNIDADES}
* @param {TIPOMOV}
* @param {FECHAFUNC}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function Kmovctodiapuni(CUENTAS,AUXILIAR,UNIDADES,TIPOMOV,FECHAFUNC,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs;

			var Nombre_Funcion = "Kmovctodiapuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","AUXILIAR","UNIDADES","TIPOMOV","FECHAFUNC","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			UNIDADESs = rango_celdas_("UNIDADES", UNIDADES);
			TIPOMOVs = rango_celdas_("TIPOMOV", TIPOMOV);
			FECHAFUNCs = rango_celdas_("FECHAFUNC", FECHAFUNC);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,AUXILIARs,UNIDADESs,TIPOMOVs,FECHAFUNCs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {ITEM}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovItemuni(CUENTAS,ITEM,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,ITEMs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovItemuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","ITEM","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			ITEMs = rango_celdas_("ITEM", ITEM);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,ITEMs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {ITEM}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovItemdbuni(CUENTAS,ITEM,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,ITEMs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovItemdbuni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","ITEM","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			ITEMs = rango_celdas_("ITEM", ITEM);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,ITEMs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {CUENTAS}
* @param {ITEM}
* @param {AUXILIAR}
* @param {PERIODOS}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function KmovItemcruni(CUENTAS,ITEM,AUXILIAR,PERIODOS,BU){
			var FECHA_ACTUALs,CUENTASs,ITEMs,AUXILIARs,PERIODOSs,BUs;

			var Nombre_Funcion = "KmovItemcruni";
			var Nombre_Parametros = ["FECHA_ACTUAL","CUENTAS","ITEM","AUXILIAR","PERIODOS","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			CUENTASs = rango_celdas_("CUENTAS", CUENTAS);
			ITEMs = rango_celdas_("ITEM", ITEM);
			AUXILIARs = rango_celdas_("AUXILIAR", AUXILIAR);
			PERIODOSs = rango_celdas_("PERIODOS", PERIODOS);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,CUENTASs,ITEMs,AUXILIARs,PERIODOSs,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}
/**
							 * Descripción
							 *
* @param {FECHA_ACTUAL}
* @param {FiltroMaestro}
* @param {Periodos}
* @param {BU}
* @return {Number}.
							 * @customfunction
							 */
function RevelacionSeccion(FiltroMaestro,Periodos,BU){
			var FECHA_ACTUALs,FiltroMaestros,Periodoss,BUs;

			var Nombre_Funcion = "RevelacionSeccion";
			var Nombre_Parametros = ["FECHA_ACTUAL","FiltroMaestro","Periodos","BU"];

			//los rangos de las celdas seleccionadas
			FECHA_ACTUALs = rango_celdas_("FECHA_ACTUAL", getPropertyFechaInforme());
			FiltroMaestros = rango_celdas_("FiltroMaestro", FiltroMaestro);
			Periodoss = rango_celdas_("Periodos", Periodos);
			BUs = rango_celdas_("BU", BU);
			
			var Valores_Parametros = rango_parametros_([FECHA_ACTUALs,FiltroMaestros,Periodoss,BUs]);
			var retorno = ejecutar_funcion(Nombre_Funcion, Nombre_Parametros, Valores_Parametros, Usuario);
			return retorno; 
}



