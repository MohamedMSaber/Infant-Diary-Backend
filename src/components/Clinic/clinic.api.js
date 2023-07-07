const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createClinic, getClinic, updateClinic, getClinics, deleteclinic } = require('./clinic.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('doctor'),createClinic);
router.route('/').get(ProtectedRoutes, AllowedTo('doctor','parent','admin'),getClinics);
router.route('/:clinicID')  
                .get(ProtectedRoutes, AllowedTo('doctor','parent','admin'),getClinic)
                .put(ProtectedRoutes, AllowedTo('doctor'), updateClinic)
                .delete(ProtectedRoutes, AllowedTo('doctor'),deleteclinic);
module.exports= router
