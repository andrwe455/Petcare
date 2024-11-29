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

module.exports = {
  addUser,
  getAllUsers
};