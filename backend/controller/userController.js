const User = require('../schemas/userSchema');

async function addUser(req, res){

  const user = await User.create(req.body)
  res.status(200).json({message:'User created successfully'})
}

async function getAllUsers(req, res){

  try{
    const users = await User.find();  
    res.status(200).json(users);
  }
  catch(error){
    console.error("Error finding users ", error);
    res.status(500).json({message: 'Error finding users ', error}); 
  }
}

async function getVeterinarians(req,res){
  try{
    const veterinarians = await User.find({role: 'veterinarian'});
    res.status(200).json(veterinarians);
  }
  catch(error){
    console.error("Error finding veterinarians ", error);
    res.status(500).json({message: 'Error finding veterinarians ', error}); 
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getUserId(req, res){
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


module.exports = {
  addUser,
  getAllUsers,
  getVeterinarians,
  deleteUser,
  updateUser,
  getUserId
};