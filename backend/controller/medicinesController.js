const medicineSchema = require('../schemas/medicineSchema');

async function createMedicine(req, res){

  const { commercial_name, generic_name, stock } = req.body;

  try {
    // Step 1: Find the existing medicine based on commercial and generic names
    const existingMedicine = await medicineSchema.findOne({commercial_name: commercial_name, generic_name: generic_name});

    const baseId = `${commercial_name.substring(0, 3).toUpperCase()}${'_'}${generic_name.substring(0, 3).toUpperCase()}`;

    if (existingMedicine) {
      // Step 2: Update the stock quantity
      existingMedicine.stock += parseInt(stock); // Adjust as needed; make sure `stock` is the right field name

      // Step 3: Save the updated medicine back to the database
      await existingMedicine.save();
      return res.redirect('/home/admin/createMedicine?success')
    } else {
      const medicineCount = await medicineSchema.countDocuments({
        medId: { $regex: new RegExp(`^${baseId}`) }
      });

      const counter = medicineCount + 1; // Increment based on existing documents
      const finalId = `${baseId}_${String(counter).padStart(3, '0')}`;

      const newMedicine = new medicineSchema({ ...req.body, medId: finalId }); // Include the final ID in the medicine document
      await newMedicine.save();
      return res.status(201).json({ message: 'New medicine created', medicine: newMedicine });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createMedicine
};