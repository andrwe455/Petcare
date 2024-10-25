const path = require('path');

function showPets(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showPets.html'));
}

function showVaccineRecords(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showVaccineRecordsBypets.html'));
}

function showNotFound(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','error','404.html'));
}

module.exports = { 
  showPets,
  showVaccineRecords,
  showNotFound
};