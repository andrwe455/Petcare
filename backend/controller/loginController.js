const {signIn,auth} = require('../database/firebase');
const usersSchema = require('../schemas/ownerSchema');

async function login(req,res) {
  const {email, password} = req.body;
  console.log(email);
  try {
      signIn(auth,email,password).then((user) => {
          usersSchema.findOne({email: email}).then((user) => {
              req.session.user = user;
              res.redirect('/home/owner/showOwnerPets');
              //res.status(200).json(user);     
          }).catch((error) => {
              res.json(error);
          });
      }).catch((error) => {
          console.log(error);
          res.status(400).json(error);
      });
  }catch(error){
    res.status(500).json({message: error.message});
  }
}

module.exports = { login };