const {Router} = require('express');
const router = Router();
const petOwnerController = require('../controller/petOwnerController');
const petController = require('../controller/petsController');
const loginController = require('../controller/loginController');
const pagesController = require('../controller/pagesController');
const appointmentController = require('../controller/appointmentController');


router.get('/home/owner/showOwnerPets', pagesController.showPets);
router.get('/home/owner/vaccineRecords/:id', pagesController.showVaccineRecords);

router.get('/getAllPets', petController.getAllPets);
router.get('/getPetVaccinationRecords',petController.getPetVaccinationRecords);
router.get('/getPetsByOwner',petOwnerController.getOwnerId,petController.getPetsByOwner);
router.get('/getPetsById/:id',petController.getPetsById);
router.get('/getappointment',appointmentController.getappointment);
router.get('/home/admin/appointments/Edit', pagesController.showAppointment);
router.get('/home/admin/appointments/Crt', pagesController.showAppointmentCrt);

router.post('/login', loginController.login);
router.post('/crtOwner', petOwnerController.crtOwner);
router.post('/crtPet', petController.crtPet);
router.post('/crtappointment',appointmentController.crtappointment);
router.put('/updateappointment',appointmentController.updateappointment)

module.exports = router;