const path = require('path');


function showPets(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showPets.html'));
  
}

function showVaccineRecords(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showVaccineRecords.html'));
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

function login(req,res){
  
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','login.html'));
}

module.exports = { 
  showPets,
  showVaccineRecords,
  addUser,
  createMedicine,
  modifyMedicine,
  showAppointment,
  showAppointmentCrt,
  login
};