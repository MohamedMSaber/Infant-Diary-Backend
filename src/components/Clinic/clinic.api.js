const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createClinic, getClinic, updateClinic, deleteClinic, getClinics } = require('./clinic.services');
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo(['doctor']),createClinic);
router.route('/').get(getClinics);
router.route('/:id').get(getClinic).put(updateClinic).delete(deleteClinic);

module.exports= router
