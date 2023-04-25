const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { getHospital, getHospitals, updateHospital, deleteHospital } = require('./hospital.services');
const router=require('express').Router();

router.route('').get(getHospitals);
router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHospital);

module.exports= router
