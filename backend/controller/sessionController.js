function getUserId(req,res, next) {
   let session = req.session.user   
  
   if (session) {
      req.user = {};
      req.user.role = session.role;
      req.user.id = session._id;
      next();
   }
   else {
      res.redirect('/login');
   }
}

function roleValidator(req,res,next){
    let session = req.session.user;
    if(session){
        let path = req.path;
        let role = session.role;
        path = path.split('/');
        path = path[2];
        if(path === role){
            next();
        }else{
            res.redirect(`/home/${role}`+`?error=`+`You don't have permission to access this page`);
        }
    }else{
        res.redirect('/login');
    }
}

function getSession(req,res){
    let session = req.session.user;
    if(session){
        res.json(session);
    }else{
        res.status(404).json({message: 'Session not found'});
    }
}


module.exports = { getUserId, roleValidator, getSession };

