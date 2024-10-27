const medicineSchema = require('../schemas/medicineSchema');

async function createMedicine(req, res){

  const { commercial_name, generic_name, stock } = req.body;

  try {

    const existingMedicine = await medicineSchema.findOne({commercial_name: commercial_name, generic_name: generic_name});
    const baseId = `${commercial_name.substring(0, 3).toUpperCase()}${'_'}${generic_name.substring(0, 3).toUpperCase()}`;

    if (existingMedicine) {

      existingMedicine.stock += parseInt(stock); 

      await existingMedicine.save();
      return res.redirect('/home/admin/createMedicine?success')
    } else {
      const medicineCount = await medicineSchema.countDocuments({
        medId: { $regex: new RegExp(`^${baseId}`) }
      });

      const counter = medicineCount + 1; 
      const finalId = `${baseId}_${String(counter).padStart(3, '0')}`;
      const newMedicine = new medicineSchema({ ...req.body, medId: finalId }); 
      
      await newMedicine.save();
      return res.status(201).json({ message: 'New medicine created', medicine: newMedicine });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function searchMedicine(req, res){

  const { searchQuery } = req.query; 

  try {

    const medicine = await medicineSchema.findOne({
      $or: [
        { commercial_name: { $regex: new RegExp(searchQuery, 'i') } },
        { generic_name: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    });

    if (medicine) {
      res.status(200).json(medicine); 
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicine data', error });
  }
}

async function modifyMedicine(req, res) {
  const { medId, originalId, commercial_name, generic_name, description, expiration_date, category, stock, price } = req.body;

  try {

    const medicine = await medicineSchema.findOne({ medId: originalId });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    const existingMedicineWithNewId = await medicineSchema.findOne({ medId });

    if (existingMedicineWithNewId && existingMedicineWithNewId.medId !== originalId) {
      return res.status(400).json({ message: 'A medicine with the new ID already exists.' });
    }

    medicine.medId = medId; 
    medicine.commercial_name = commercial_name;
    medicine.generic_name = generic_name;
    medicine.description = description;
    medicine.expiration_date = expiration_date;
    medicine.category = category;
    medicine.stock = stock;
    medicine.price = price;

    await medicine.save();

    return res.status(201).json({ message: 'Modified successfully' });
  } catch (error) {
    console.error("Error in modifyMedicine:", error);
    res.status(500).json({ message: 'Error updating medicine', error });
  }
}

async function removeMedicine(req, res){

}

async function checkIdExists(req, res){

  const { id } = req.query;
  const medicine = await medicineSchema.findOne({ medId: id });
  res.json(!!medicine); 
}

module.exports = {
  createMedicine,
  searchMedicine,
  modifyMedicine,
  removeMedicine,
  checkIdExists
};