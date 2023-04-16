const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createSercice, getServices, getService, updateService, deleteService } = require('./service.services');
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo(['hospital']),createSercice);
router.route('/').get(getServices);
router.route('/:id').get(getService).put(updateService).delete(deleteService);

module.exports= router