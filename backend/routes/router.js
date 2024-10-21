const {Router} = require('express');
const router = Router();
const petOwnerController = require('../controller/petOwnerController');
const petController = require('../controller/petsController');
const loginController = require('../controller/loginController');
const pagesController = require('../controller/pagesController');


router.get('/home/owner/showOwnerPets', pagesController.showPets);
router.get('/home/owner/vaccineRecords/:id', pagesController.showVaccineRecords);

router.get('/getAllPets', petController.getAllPets);
router.get('/getPetVaccinationRecords',petController.getPetVaccinationRecords);
router.get('/getPetsByOwner',petOwnerController.getOwnerId,petController.getPetsByOwner);
router.get('/getPetsById/:id',petController.getPetsById);



router.post('/login', loginController.login);
router.post('/crtOwner', petOwnerController.crtOwner);
router.post('/crtPet', petController.crtPet);
module.exports = router;