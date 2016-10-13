/**
* manages the connection between the data and the chart
* @namespace Props
*/
var Props = (function (prop) {
  'use strict';
  var ns = prop;
  
  prop.globals = {
    root:'Zeus Excel Online', 
    resources:'Resources', 
    empresas: 'Empresas.xml',
    superUser:'zeussql',
    version: "1.1.0",
    default_: ""
  };
  
  prop.generales = {
    user: PropertiesService.getUserProperties(),
    script:PropertiesService.getScriptProperties(),
    document:PropertiesService.getDocumentProperties()
  };
  
  prop.app = {
    empresas: "EMPRESAS",
    finforme: "FECHA",
    user: "USUARIO",
    email: "EMAIL",
    empresa: "EMPRESA_ACTUAL",
    aplicaciones: "APLICACIONES",
    aplicacion: "APLICACION",
    explorador: "EXPLORADOR",
  };
  
  prop.isAuthDone = function () {
    return ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL)
    .getAuthorizationStatus() === ScriptApp.AuthorizationStatus.NOT_REQUIRED;
  };
  
  prop.get = function (props,optKey ) {
    var item = ns.isAuthDone() ? props.getProperty(optKey) : null;
    return item ? JSON.parse(item) : item;
  };
  
  prop.set = function (props, key , ob) {
    return prop.isAuthDone() ? props.setProperty(key, JSON.stringify(ob)) : null;
  };
  
  prop.setEnterprises = function(ob) {
    return prop.isAuthDone() ? prop.set(prop.generales.user, prop.app.empresas, ob) : null;
  };
  
  prop.getEnterprises = function() {
    var item = prop.get (prop.generales.user, prop.app.empresas);
    for(var k in item)
    {
      item[k] = JSON.parse(item[k]);
    }
    return prop.isAuthDone() ? item : null;  
  };
  
  prop.setFecha = function(ob) {
    return prop.isAuthDone() ? prop.set(prop.generales.document, prop.app.finforme, ob || FechaCorteNumero()) : null;
    
  };
  
  prop.getFecha = function() {
    return prop.isAuthDone() ? prop.get(prop.generales.document, prop.app.finforme) : null;
  };
  
  prop.setUsuario = function(ob) {
    if(!Utils.isUndefined(ob))return prop.isAuthDone() ? prop.set(prop.generales.document, prop.app.user, ob) : null;
    else throw "Usuario indefinido o null";
  };
  
  prop.getUsuario = function() {
    return prop.isAuthDone() ? prop.get(prop.generales.document, prop.app.user) : null;
  };
  
  prop.setEmail = function() {
    var email_ = SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail();
    if(Utils.isEmail(email_)) return prop.isAuthDone() ? prop.set(prop.generales.document, prop.app.email, email_) : null;
    else throw "Email indefinido o inválido";
  };
  
  prop.getEmail = function() {
    return prop.isAuthDone() ? prop.get(prop.generales.document, prop.app.email) : null;
  };
  
  prop.getEnterprise = function(ob) {
    return prop.isAuthDone() ? prop.get(prop.generales.user, prop.app.empresa) : null;
  };
  
  prop.getAplicaciones = function() {
    return prop.isAuthDone() ? prop.get(prop.generales.user, prop.app.aplicaciones) : null;
  };
  
  prop.getAplicacion = function() {
    return prop.isAuthDone() ? prop.get(prop.generales.user, prop.app.aplicacion) : null;
  };
  
  prop.empresaActual = function(empresa){
    var obj_ = prop.getEnterprises();
    empresa = Utils.fixDef(empresa, obj_.empresas[0]);
    var index_ = obj_.empresas.indexOf(empresa);
    var success_ = (index_ !== -1) ? prop.set(prop.generales.user, prop.app.empresa, obj_.empresas[index_]) : undefined;
    if(Utils.isUndefined(success_)) throw "No se encontró la empresa actual";
    prop.aplicaciones(); 
  };
  
  prop.aplicaciones = function(){
    var apps_ = [];
    var emps_ = prop.getEnterprises();
    var emp_ = prop.getEnterprise();
    for(var i = 0; i < emps_.aplicaciones.length; i++){
      var emp2_ = emps_.aplicaciones[i][0]; 
      if(emp_ === emp2_){
        apps_.push(emps_.aplicaciones[i][1]);
      }
    }
    return prop.isAuthDone() ? prop.set(prop.generales.user, prop.app.aplicaciones, apps_.join(',')) : null;
  };
  
  prop.aplicacion = function(a){
    var apps_ = prop.aplicaciones();
    var array_ = apps_.split(',');
    a = Utils.fixDef(a, array_[0]);
    return prop.isAuthDone() ? prop.set(prop.generales.user, prop.app.aplicacion, a) : null;
  };
  
  prop.setExplorador = function(ob) {
    return prop.isAuthDone() ? prop.set(prop.generales.document, prop.app.explorador, ob || 20) : null;
    
  };
  
  prop.getExplorador = function() {
    return prop.isAuthDone() ? prop.get(prop.generales.document, prop.app.explorador) : null;
  };
  
  prop.reset = function(){
    prop.generales.script.deleteAllProperties();
    prop.generales.user.deleteAllProperties();
    prop.generales.document.deleteAllProperties();
  };
   
  return prop;
  
})( Props || {} );
