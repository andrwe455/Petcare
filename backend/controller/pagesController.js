const path = require('path');

function showPets(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showPets.html'));
}

function showVaccineRecords(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','pets','showVaccineRecords.html'));
}

function addUser(req, res){
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','admin','addUsers.html'));
}

module.exports = { 
  showPets,
  showVaccineRecords,
  addUser
};