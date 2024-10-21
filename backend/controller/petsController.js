const Pet = require('../schemas/petSchema');

async function getPetVaccinationRecords(req, res) {
    try {
      const petId = req.params.petId;
      const pet = await Pet.findById(petId);
      if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
      }
      const vaccinationRecords = await petController.getVaccinationRecords(petId);
      return res.status(200).json(vaccinationRecords);
    }
    catch (error) {
      return res.status(500).json({ message: error.message });
    }
}

async function getVaccinationRecords(petId) {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
    }
    const vaccinationRecords = await petController.getVaccinationRecords(petId);
    return res.status(200).json(vaccinationRecords);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllPets(req, res) {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPetsByOwner(req, res) {
  try {
    const ownerId = req.owner;
    const pets = await Pet.find({ owner: ownerId });
    res.status(200).json(pets);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function crtPet(req, res) {
  try{
    const ownerId = req.owner;
    const pet = await Pet.create(req.body);
    return res.status(201).json(pet);
  }catch{
    return res.status(500).json({ message: error.message });
  } 
}

async function getPetsById(req, res) {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    return res.status(200).json(pet);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { 
  getPetVaccinationRecords,
  getVaccinationRecords,
  getAllPets,
  getPetsByOwner,
  crtPet,
  getPetsById
};