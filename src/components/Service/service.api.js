const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { getService, updateService, deleteService, createService } = require('./service.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('hospital'),createService);
router.route('/:serviceID')
                        .get(ProtectedRoutes,AllowedTo('hospital','parent','hospital','doctor'),getService)
                        .put(ProtectedRoutes,AllowedTo('hospital'),updateService)
                        .delete(ProtectedRoutes,AllowedTo('hospital'),deleteService);

module.exports= router