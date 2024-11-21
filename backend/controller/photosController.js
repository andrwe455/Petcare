const doenv = require('dotenv')
const multer = require('multer');
const upload = multer().single('image');


doenv.config({path: 'backend/controller/.env'});

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? 'dqszmm2ko',
  api_key: process.env.CLOUDINARY_API_KEY ?? '486987815318189',
  api_secret: process.env.CLOUDINARY_API_SECRET ?? 'VTMzLdgjCHB_Q8A1r3FRMa6_Qq8',
  secure: true,
});

async function crPet(req,res,next){

  upload(req, res, async function (err) {
    const ownerId = req.owner ?? req.body.owner ?? req.session.user._id;
    cloudinary.v2.uploader.upload_stream({
      resource_type: 'image',
      public_id: req.body.name,
      folder: `${ownerId}/pets/${req.body.name}`
    }, async function (error, result) {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      req.body.image = result.url;
      req.body.owner = ownerId;
      next();
    }).end(req.file.buffer);
  });
}

async function deletePhoto(req, res,next) {
  const ownerId = req.owner ?? req.body.owner ?? req.session.user._id;
  cloudinary.v2.api.delete_resources_by_prefix(`${ownerId}/pets/${req.params.name}`, async function (error, result) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (result.deleted && !req.params.id) {
      return res.status(200).json({ message: 'Photo deleted' });
    }
    await cloudinary.v2.api.delete_folder(`${ownerId}/pets/${req.params.name}`);
    next();
  });
}

async function updatePhoto(req, res,next) {
  
  cloudinary.v2.uploader.upload_stream({
    resource_type: 'image',
    public_id: req.body.name,
    folder: `${ownerId}/pets/${req.body.name}`
  }, async function (error, result) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    req.body.image = result.url;
    req.body.owner = ownerId;
    next();
  }).end(req.file.buffer);
}



module.exports = {
  crPet,
  deletePhoto,
  updatePhoto
}