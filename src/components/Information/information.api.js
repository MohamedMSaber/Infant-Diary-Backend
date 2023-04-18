const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createInformation, getInformations, getInformation, updateInformation, deleteInformation } = require('./information.services');
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo(['admin']),createInformation);
router.route('/').post(createInformation);
router.route('/').get(getInformations);
router.route('/:id').get(getInformation).put(updateInformation).delete(deleteInformation);

module.exports= router

