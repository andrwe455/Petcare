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
const registerController = require('../controller/registerController');
const photoController = require('../controller/photosController');
const recipesController = require('../controller/recipesController');

router.get('/login', pagesController.login);

router.get('/home/owner',sess.getUserId,sess.roleValidator, pagesController.owner);
router.get('/home/owner/showOwnerPets',sess.getUserId,sess.roleValidator ,pagesController.showPets);
router.get('/home/owner/vaccineRecords',sess.getUserId, sess.roleValidator,pagesController.showVaccineRecords);
router.get('/home/owner/vaccineRecords/:id',sess.getUserId, sess.roleValidator,pagesController.showVaccineRecords);

router.get('/home/veterinarian',sess.getUserId,sess.roleValidator, pagesController.veterinarian);
router.get('/home/veterinarian/showPets',sess.getUserId,sess.roleValidator, pagesController.showPets);
router.get('/home/veterinarian/vaccineRecords',sess.getUserId,sess.roleValidator, pagesController.showVaccineRecords);
router.get('/home/veterinarian/vaccineRecords/:id',sess.getUserId, sess.roleValidator,pagesController.showVaccineRecords);
router.get('/home/veterinarian/createRecipe', sess.getUserId,sess.roleValidator, pagesController.createRecipe);
router.get('/home/veterinarian/searchRecipe', sess.getUserId,sess.roleValidator, pagesController.searchRecipe);

router.get('/getUserData',sess.getSession);
router.get('/getAllUsers', userController.getAllUsers);

router.get('/home/admin',sess.getUserId,sess.roleValidator, pagesController.admin);
router.get('/home/admin/addUser',sess.getUserId,sess.roleValidator, pagesController.addUser)
router.post('/crtUser',registerController.register,userController.addUser)
router.get('/home/admin/showUsers',sess.getUserId,sess.roleValidator, pagesController.showUsers);

router.get('/home/admin/createMedicine',sess.getUserId,sess.roleValidator, pagesController.createMedicine);
router.get('/home/admin/modifyMedicine',sess.getUserId,sess.roleValidator, pagesController.modifyMedicine);
router.get('/home/admin/seeAllMedicines',sess.getUserId,sess.roleValidator, pagesController.seeAllMedicines);
router.get('/getAllMedicines', medicinesController.getAllMedicines);

router.get('/getAllPets', petController.getAllPets);
router.get('/getPetVaccinationRecords',petController.getPetVaccinationRecords);
router.get('/getPetsByOwner',petOwnerController.getOwnerId,petController.getPetsByOwner);
router.get('/getPetsById/:id',petController.getPetsById);

router.get('/searchMedicine', medicinesController.searchMedicine);
router.get('/checkIdExists', medicinesController.checkIdExists);

router.get('/getappointment',appointmentController.getappointment);
router.get('/home/admin/appointments/Edit',sess.getUserId, pagesController.showAppointment);
router.get('/home/admin/appointments/Crt',sess.getUserId, pagesController.showAppointmentCrt);
router.get('/home/admin/appointments/Dlt', pagesController.showAppointmentDlt);
router.get('/home/admin/doctorSchedule',sess.getUserId,sess.roleValidator, pagesController.showdoctorsSchedule);

router.get('/home/admin/appointments/Edit',sess.getUserId,sess.roleValidator, pagesController.showAppointment);
router.get('/home/admin/appointments/Crt',sess.getUserId,sess.roleValidator, pagesController.showAppointmentCrt);
router.get('/getSession', sess.getUserId);
router.get('/logout', loginController.Logout);

router.post('/login', loginController.login);
router.post('/crtOwner', petOwnerController.crtOwner);
router.post('/createPet',photoController.crPet ,petController.crtPet);
router.post('/crtPet', petController.crtPet);

router.post('/crtappointment',appointmentController.crtappointment);
router.put('/updateappointment',appointmentController.updateappointment);
router.post('/deleteappointment',appointmentController.deleteappointment);
router.get('/crtappointmentusers',appointmentController.crtappointmentusers);
router.get('/crtappointmentpets',appointmentController.crtappointmentpets);

router.post('/updateVaccineRecord', petController.updateVaccineRecord);
router.post('/updatePet', petController.updatePet);

router.post('/createMedicine', medicinesController.createMedicine);
router.post('/modifyMedicine', medicinesController.modifyMedicine);
router.delete('/removeMedicine', medicinesController.removeMedicine);
router.delete('/deletePet/:id/:name',photoController.deletePhoto, petController.deletePet);

router.post('/createRecipe', recipesController.createRecipe);
router.put('/updateRecipe/:id', recipesController.modifyRecipe);
router.get('/getRecipes', recipesController.getRecipes);

router.get('/veterinarians', userController.getVeterinarians);
router.get('/getSchedule/:id', appointmentController.getappointmentByVeterinarian);
module.exports = router;