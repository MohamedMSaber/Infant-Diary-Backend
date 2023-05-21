const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createVaccine, getVaccines, getVaccine, updateVaccine, deleteVaccine } = require('./vaccine.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo(['admin']),createVaccine);
router.route('').get(getVaccines);
router.route('/:id').get(getVaccine).put(updateVaccine).delete(deleteVaccine);

module.exports= router
