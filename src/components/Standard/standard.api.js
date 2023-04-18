const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createStandard, getStandards, getStandard, updateStandard, deleteStandard } = require('./standard.services');
const router=require('express').Router();


//router.route('/:userType').post(ProtectedRoutes,AllowedTo(['admin']),createStandard);
router.route('/').post(createStandard);
router.route('/').get(getStandards);
router.route('/:id').get(getStandard).put(updateStandard).delete(deleteStandard);

module.exports= router
