const { ProtectedRoutes, AllowedTo } = require("../User/Auth/user.auth");
const { addChild, updateChild, deleteChild, getChildren, getChild } = require("./child.services");
const router=require('express').Router();


router.route('/:userType/addChild').post(ProtectedRoutes,AllowedTo('parent'),addChild );

router.route('/:id/:userType/updateChild').post(ProtectedRoutes,AllowedTo('parent'),updateChild );

router.route('/:id/:userType/deleteChild').post(ProtectedRoutes,AllowedTo('parent'),deleteChild );

router.route('/:id/:userType/getChild').post(ProtectedRoutes,AllowedTo('parent'),getChild );

router.route('/:userType/getChildren').post(ProtectedRoutes,AllowedTo('parent'),getChildren );

module.exports= router