const {Router} = require('express');
const router = Router();
const medicinesController = require('../controller/medicinesController')
const petOwnerController = require('../controller/petOwnerController');
const petController = require('../controller/petsController');
const loginController = require('../controller/loginController');
const pagesController = require('../controller/pagesController');
const userController = require('../controller/userController')
const appointmentController = require('../controller/appointmentController');
const sess = require('../controller/sessionController');


router.get('/login', pagesController.login);


router.get('/home/owner/showOwnerPets',sess.getUserId,sess.roleValidator ,pagesController.showPets);
router.get('/home/owner/vaccineRecords',sess.getUserId, pagesController.showVaccineRecords);
router.get('/home/owner/vaccineRecords/:id',sess.getUserId, pagesController.showVaccineRecords);

router.get('/home/veterinary/showPets',sess.getUserId,sess.roleValidator, pagesController.showPets);
router.get('/home/veterinary/vaccineRecords',sess.getUserId, pagesController.showVaccineRecords);
router.get('/home/veterinary/vaccineRecords/:id',sess.getUserId, pagesController.showVaccineRecords);

router.get('/home/admin/addUser',sess.getUserId, pagesController.addUser)
router.post('/crtUser', userController.addUser)
router.get('/home/admin/createMedicine',sess.getUserId, pagesController.createMedicine);
router.get('/home/admin/modifyMedicine',sess.getUserId, pagesController.modifyMedicine);

router.get('/getAllPets', petController.getAllPets);
router.get('/getPetVaccinationRecords',petController.getPetVaccinationRecords);
router.get('/getPetsByOwner',petOwnerController.getOwnerId,petController.getPetsByOwner);
router.get('/getPetsById/:id',petController.getPetsById);

router.get('/searchMedicine', medicinesController.searchMedicine);
router.get('/checkIdExists', medicinesController.checkIdExists);
router.get('/getappointment',appointmentController.getappointment);
router.get('/home/admin/appointments/Edit',sess.getUserId, pagesController.showAppointment);
router.get('/home/admin/appointments/Crt',sess.getUserId, pagesController.showAppointmentCrt);
router.get('/getSession', sess.getUserId);
router.get('/logout', loginController.Logout);

router.post('/login', loginController.login);
router.post('/crtOwner', petOwnerController.crtOwner);
router.post('/crtPet', petController.crtPet);
router.post('/crtappointment',appointmentController.crtappointment);
router.put('/updateappointment',appointmentController.updateappointment)

router.post('/updateVaccineRecord', petController.updateVaccineRecord);
router.post('/updatePet', petController.updatePet);

router.post('/createMedicine', medicinesController.createMedicine);
router.post('/modifyMedicine', medicinesController.modifyMedicine);

module.exports = router;