const path = require('path');

function showPets(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showPets.html'));
}

function showVaccineRecords(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showVaccineRecordsBypets.html'));
}

function addUser(req, res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','admin','addUsers.html'));
}

function createMedicine(req, res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','inventoryManagement','addMedicine.html'));
}

function modifyMedicine(req, res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','inventoryManagement','modifyMedicine.html'));
}

function showAppointment(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','adminAppointments', 'adminEditAppointment.html'));
}

function showAppointmentCrt(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','adminAppointments', 'adminCreateAppointment.html'));
}

function showAppointmentDlt(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','adminAppointments', 'adminDeleteAppointment.html'));
}

module.exports = { 
  showPets,
  showVaccineRecords,
  addUser,
  createMedicine,
  modifyMedicine,
  showAppointment,
  showAppointmentCrt,
  showAppointmentDlt
};