const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createStandard, getStandard, updateStandard, deleteStandard,getStandards } = require('./standard.services');
const router=require('express').Router();

//router.route('/:userType').post(ProtectedRoutes,AllowedTo(['admin']),createStandard);
router.route('/').post(ProtectedRoutes,AllowedTo('admin'),createStandard)
                 .get(ProtectedRoutes,AllowedTo('admin', 'parent'),getStandards);
router.route('/:id').get(ProtectedRoutes,AllowedTo('admin'),getStandard)
                    .put(ProtectedRoutes,AllowedTo('admin'),updateStandard)
                    .delete(ProtectedRoutes,AllowedTo('admin'),deleteStandard);

module.exports= router;
