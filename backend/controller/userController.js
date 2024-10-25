const User = require('../schemas/userSchema');

async function addUser(req, res){

    const user = await User.create(req.body)
    res.status(200).json({message:'User create'})
}

module.exports = {
    addUser
};
