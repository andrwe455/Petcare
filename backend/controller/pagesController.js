const path = require('path');

function showPets(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showPets.html'));
}

function showVaccineRecords(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showVaccineRecords.html'));
}

function createMedicine(req, res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','inventoryManagement','addMedicine.html'));
}

function modifyMedicine(req, res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','inventoryManagement','modifyMedicine.html'));
}

module.exports = { 
  showPets,
  showVaccineRecords,
  createMedicine,
  modifyMedicine
};