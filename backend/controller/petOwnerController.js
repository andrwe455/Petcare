const Owner = require('../schemas/userSchema');

async function getOwnerId(req, res, next) {
  try {
    const ownerId = req.session.user._id;
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    req.owner = owner._id;
    next();
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function crtOwner(req, res) {
  try {
    const owner = await Owner.create(req.body);
    return res.status(201).json(owner);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { 
  getOwnerId,
  crtOwner
};