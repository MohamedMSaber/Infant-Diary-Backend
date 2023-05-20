const { ProtectedRoutes, AllowedTo } = require("../User/Auth/user.auth");
const { addChild, updateChild, deleteChild, getChildren, getChild } = require("./child.services");
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('parent'),addChild);
router.route('/').get(ProtectedRoutes, AllowedTo('parent'),getChildren);
router.route('/:childID').put(ProtectedRoutes, AllowedTo('parent'),updateChild).get(getChild).delete(ProtectedRoutes, AllowedTo('parent'),deleteChild);

module.exports= router