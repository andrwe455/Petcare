const {signIn,auth,logout} = require('../database/firebase');
const usersSchema = require('../schemas/userSchema');

async function login(req,res) {
  const {email, password} = req.body;
  try {
      signIn(auth,email,password).then((user) => {
          usersSchema.findOne({email: email}).then((user) => {
              req.session.user = user;
              res.redirect("/home/"+user.role);
          }).catch((error) => {
              res.json(error);
          });
      }).catch((error) => {
          res.redirect('/login?error='+error.message);
      });
  }catch(error){
    res.status(500).json({message: error.message});
  }
}

async function Logout(req,res){
    try{
        await logout(auth);
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
        })
        res.redirect('/');
    }catch(error){
        res.status(500).json({message: error.message});
    }
    
}


module.exports = { login, Logout };