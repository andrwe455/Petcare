const path = require('path');

function showPets(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','owner','showPets.html'));
}

function showVaccineRecords(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','owner','showVaccineRecords.html'));
}

function showAppointment(req, res) {
  const proyectPath = path.resolve(__dirname, '../..');
  res.sendFile(path.join(proyectPath,'frontend','modules','adminDashboard','adminAppointments', 'adminEditAppointment.html'));
}

module.exports = { 
  showPets,
  showVaccineRecords,
  showAppointment
};