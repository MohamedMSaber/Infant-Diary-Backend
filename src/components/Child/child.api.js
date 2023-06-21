const { uploadingSingleFile } = require("../../utils/fileUploading");
const { ProtectedRoutes, AllowedTo } = require("../User/Auth/user.auth");
const { addChild, updateChild, deleteChild, getChildren, getChild, takeVaccine, generateChartReport, addChildMeasurement, updateChildMeasurement, generateLineChartReport } = require("./child.services");
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('parent'),uploadingSingleFile('childPic'),addChild);
router.route('/').get(ProtectedRoutes, AllowedTo('admin'),getChildren);
router.route('/:childID').get(ProtectedRoutes, AllowedTo('parent'),getChild)
                         .put(ProtectedRoutes, AllowedTo('parent'),uploadingSingleFile('childPic'),updateChild)
                         .get(ProtectedRoutes, AllowedTo('parent'),getChild)
                         .delete(ProtectedRoutes, AllowedTo('parent'),deleteChild);
                         router.route('/measurements/:childID').put(ProtectedRoutes, AllowedTo('parent'),addChildMeasurement);
                         router.route('/measurements/:childID/:measurementID').put(ProtectedRoutes, AllowedTo('parent'),updateChildMeasurement);                    
router.route('/:childID/:vaccineID').put(ProtectedRoutes, AllowedTo('parent'),takeVaccine);
router.route('/:childID/generateReport').get(ProtectedRoutes, AllowedTo('parent'),generateChartReport)                        
router.route('/:childID/generateLineChartReport').get(ProtectedRoutes, AllowedTo('parent'),generateLineChartReport)    
module.exports= router