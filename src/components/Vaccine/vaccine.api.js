const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createVaccine, getVaccines, getVaccine, updateVaccine, deleteVaccine } = require('./vaccine.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('admin'),createVaccine)
                 .get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getVaccines);
router.route('/:id').get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getVaccine)
                    .put(ProtectedRoutes,AllowedTo('admin'),updateVaccine)
                    .delete(ProtectedRoutes,AllowedTo('admin'),deleteVaccine);

module.exports= router
