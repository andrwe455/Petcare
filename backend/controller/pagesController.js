const path = require('path');

function showPets(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showPets.html'));
}

function showVaccineRecords(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showVaccineRecordsBypets.html'));
}

function createRecipe(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','veterinarian','recipesManagement', 'createRecipe.html'));
}

function searchRecipe(req, res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','veterinarian','recipesManagement', 'searchRecipe.html'));
}

function addUser(req, res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','admin','addUsers.html'));
}

function createMedicine(req, res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','inventoryManagement','addMedicine.html'));
}

function modifyMedicine(req, res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','inventoryManagement','modifyMedicine.html'));
}

function seeAllMedicines(req, res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','inventoryManagement','seeAllMedicines.html'));
}

function showAppointment(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','adminAppointments', 'adminEditAppointment.html'));
}

function showAppointmentCrt(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','adminAppointments', 'adminCreateAppointment.html'));
}

function showAppointmentDlt(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','adminAppointments', 'adminDeleteAppointment.html'));
}

function login(req,res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','login.html'));
}

function owner(req,res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','owner','mainDashboard.html'));
}

function veterinarian(req,res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','veterinarian','mainDashboard.html'));
}

function admin(req,res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','mainDashboard.html'));
}

function showUsers(req,res){
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','admin','viewUsers.html'));
}


function showDiagnosticCrt(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','veterinarian','DiagnosticManagement','createDiagnostic.html'));
}

module.exports = { 
  showPets,
  showVaccineRecords,
  addUser,
  createRecipe,
  searchRecipe,
  createMedicine,
  modifyMedicine,
  seeAllMedicines,
  showAppointment,
  showAppointmentCrt,
  showAppointmentDlt,
  login,
  owner,
  veterinarian,
  admin,
  showUsers,
  showDiagnosticCrt
};