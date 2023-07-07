const { ProtectedRoutes, AllowedTo } = require('../Auth/user.auth');
const { updateHospitalProfile, getHospitals, getSpecificHospital, deleteHospitalProfile, addVaccines, deleteVaccine } = require('./hospital.services');
const router=require('express').Router();

// router.route('').get(getHospitals);
// router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHospital);

router.route('/')
                .get(ProtectedRoutes , AllowedTo('hospital','parent','doctor','admin'),getHospitals)
                .put(ProtectedRoutes , AllowedTo('hospital'),updateHospitalProfile)
                .delete(ProtectedRoutes , AllowedTo('hospital'),deleteHospitalProfile)
router.route('/hospitalInfo').get(ProtectedRoutes , AllowedTo('hospital'),getSpecificHospital)
router.route('/addVaccine/:vaccineID').put(ProtectedRoutes , AllowedTo('hospital'),addVaccines);
router.route('/deleteVaccine/:vaccineID').put(ProtectedRoutes , AllowedTo('hospital'),deleteVaccine);
router.route('/:hospitalID')
                .get(ProtectedRoutes , AllowedTo('hospital','parent','doctor','admin'),getSpecificHospital)
                .delete(ProtectedRoutes , AllowedTo('admin'),deleteHospitalProfile)


module.exports= router
