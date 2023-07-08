const { uploadingSingleFile } = require('../../utils/fileUploading');
const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createInformation, getInformation, updateInformation, deleteInformation, getSpecificInformation, getAllInformation } = require('./information.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('admin'),uploadingSingleFile('image'),createInformation)
                 .get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getAllInformation);
router.route('/child/:childId').get(ProtectedRoutes,AllowedTo('parent'),getInformation);
router.route('/:id').put(ProtectedRoutes,AllowedTo('admin'),uploadingSingleFile('image'),updateInformation)
                    .delete(ProtectedRoutes,AllowedTo('admin'),deleteInformation)
                    .get(ProtectedRoutes,AllowedTo('parent', 'admin','doctor'),getSpecificInformation);

module.exports= router

