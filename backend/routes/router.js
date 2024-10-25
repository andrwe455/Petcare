const {Router} = require('express');
const router = Router();
const medicinesController = require('../controller/medicinesController')
const petOwnerController = require('../controller/petOwnerController');
const petController = require('../controller/petsController');
const loginController = require('../controller/loginController');
const pagesController = require('../controller/pagesController');
const userController = require('../controller/userController')
const appointmentController = require('../controller/appointmentController');


router.get('/home/owner/showOwnerPets', pagesController.showPets);
router.get('/home/owner/vaccineRecords', pagesController.showVaccineRecords);
router.get('/home/owner/vaccineRecords/:id', pagesController.showVaccineRecords);

router.get('/home/veterinary/showPets', pagesController.showPets);
router.get('/home/veterinary/vaccineRecords', pagesController.showVaccineRecords);
router.get('/home/veterinary/vaccineRecords/:id', pagesController.showVaccineRecords);

router.get('/home/admin/addUser', pagesController.addUser)
router.post('/crtUser', userController.addUser)
router.get('/home/admin/createMedicine', pagesController.createMedicine);

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

router.post('/updateVaccineRecord', petController.updateVaccineRecord);
router.post('/updatePet', petController.updatePet);

router.post('/createMedicine', medicinesController.createMedicine);

module.exports = router;