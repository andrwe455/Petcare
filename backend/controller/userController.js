const User = require('../schemas/userSchema');

async function addUser(req, res){

    const user = await User.create(req.body)
    res.status(200).json({message:'User created successfully'})
}

async function getAllUsers(req, res) {
    try {
      const user = await User.find();
      res.status(200).json(user);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = {
    addUser,
    getAllUsers
};