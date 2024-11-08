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

module.exports = { 
  showPets,
  showVaccineRecords,
  addUser,
  createMedicine,
  modifyMedicine,
  seeAllMedicines,
  showAppointment,
  showAppointmentCrt,
  login,
  owner,
  veterinarian,
  admin,
  showUsers
};