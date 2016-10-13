function setPropertiesEnterprise(enterprise, applications, connections) {
  var scriptProperties = PropertiesService.getScriptProperties();
  this.enterprise = JSON.stringify(enterprise);
  this.applications = JSON.stringify(applications);
  this.connections = JSON.stringify(connections);
  var newEmpresas = {empresas: this.enterprise, aplicaciones: this.applications, conexiones: this.connections};
  scriptProperties.setProperties(newEmpresas);
}

function getPropertiesEnterprise(){
  var scriptProperties = PropertiesService.getScriptProperties();
  var AllProperties = scriptProperties.getProperties();
  var arrayEmpresas = JSON.parse(AllProperties['empresas']);
  var arrayApplications = JSON.parse(AllProperties['aplicaciones']);
  var arrayConnections = JSON.parse(AllProperties['conexiones']);
  return {empresas: arrayEmpresas, aplicaciones: arrayApplications, conexiones: arrayConnections};
}

function setPropertyFechaInforme(fecha_informe) {
  var documentProperties = PropertiesService.getDocumentProperties();
  this.fecha_informe = isEmptyOrNull_(fecha_informe) ? FechaCorteNumero() : fecha_informe;
  documentProperties.setProperty('Fecha', this.fecha_informe);     
}

function getPropertyFechaInforme(){
  var documentProperties = PropertiesService.getDocumentProperties();
  return documentProperties.getProperty('Fecha');
}

function setPropertyUser(user){
  var userProperties = PropertiesService.getUserProperties();
  this.user = user;
  userProperties.setProperty('Usuario', this.user);
}

function getPropertyUser(){
  var userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperty('Usuario');
}

function setOwnerEmail(){
  var userProperties = PropertiesService.getUserProperties();
  this.email = SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail();
  userProperties.setProperty('Email', this.email);
}

function getOwnerEmail(){
  var userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperty('Email');
}

function setActualEnterprise(empresa_actual){
  var scriptProperties = PropertiesService.getScriptProperties();
  var AllProperties = scriptProperties.getProperties();
  var arrayEmpresas = JSON.parse(AllProperties['empresas']);
  var arrayApplications = JSON.parse(AllProperties['aplicaciones']);
  empresa_actual = isNull_(empresa_actual, arrayEmpresas[0]);
  var index = arrayEmpresas.indexOf(empresa_actual);
  if(index == -1){
    scriptProperties.setProperty('EMPRESA_ACTUAL','Enterprise not found');
  }else{
    scriptProperties.setProperty('EMPRESA_ACTUAL',arrayEmpresas[index]);
  }
  setP_CurrentAplications(); 
}

function getP_CurrentEnterprise(){
  var scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty('EMPRESA_ACTUAL');
}

function setP_CurrentAplications(){
  var apps = [];
  var scriptProperties = PropertiesService.getScriptProperties();
  var AllProperties = scriptProperties.getProperties();
  var currentEnterprise = getP_CurrentEnterprise();
  var arrayApplications = JSON.parse(AllProperties['aplicaciones']);
  for(var i = 0; i < arrayApplications.length; i++){
    var matriz = arrayApplications[i];
    var empresa = matriz[0]; 
    if(currentEnterprise === empresa){
      apps.push(matriz[1]);
    }
  }
  scriptProperties.setProperty('CURRENT_APPS', apps.join(','));  
}

function setP_CurrentAplication(aplicacion){
  var scriptProperties = PropertiesService.getScriptProperties();
  var apps = getP_CurrentAplications();
  var array = apps.split(',');
  this.aplicacion = isNull_(aplicacion, array[0]);
  scriptProperties.setProperty('CURRENT_APP', this.aplicacion);
}

function getP_CurrentAplications(){
  var scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty('CURRENT_APPS');
}

function getP_CurrentAplication(){
  var scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty('CURRENT_APP');
}

function setCantExplFunciones(index){
  var documentProperties = PropertiesService.getDocumentProperties();
  this.index = isNull_(index, 20);
  documentProperties.setProperty('EXPLORADOR', this.index)
}

function getCantExplFunciones(index){
  var documentProperties = PropertiesService.getDocumentProperties();
  return documentProperties.setProperty('EXPLORADOR');
}
