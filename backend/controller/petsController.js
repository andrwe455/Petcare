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
      return res.status(500).json({ message: 'missing id' });
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
    return res.status(500).json({ message: 'missing id' });
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

    if(req.session.user.role === 'owner'){
      res.redirect('/home/owner/showOwnerPets?info=Pet created')
    }else{
      res.status(201).json(pet);
    }
  }catch (error) {
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
    return res.status(500).json({ message: 'missing id' });
  }
}

async function updateVaccineRecord(req, res) {
  try {
    const petId = req.body.id;
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    pet.vaccinationRecords.forEach((record) => {
      if (record.vaccine == req.body.vaccine) {
        record.vaccine = req.body.vaccine;
        record.date = req.body.date;
        record.nextAppointment = req.body.nextAppointment;
      }
    });
    
    await pet.save();
    res.redirect(`/home/owner/vaccineRecords/${petId}`);

  }catch(error){
    return res.status(500).json({ message: error.message });
  }
}

async function updatePet(req, res) {
  try {
    const petId = req.body.id;
    const pet = await Pet.findByIdAndUpdate(petId, req.body);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.redirect('/home/owner/showOwnerPets');
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deletePet(req, res) {
  try {
    const petId = req.params.id;
    const pet = await Pet.findByIdAndDelete(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet deleted' });
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
  getPetsById,
  updateVaccineRecord,
  updatePet,
  deletePet
};