const { ProtectedRoutes, AllowedTo } = require("../User/Auth/user.auth");
const { addChild, updateChild, deleteChild, getChildren, getChild, childUpComingVaccines } = require("./child.services");
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('parent'),addChild);
router.route('/').get(ProtectedRoutes, AllowedTo('admin'),getChildren);
router.route('/:childID').get(ProtectedRoutes, AllowedTo('parent'),childUpComingVaccines).put(ProtectedRoutes, AllowedTo('parent'),updateChild).get(ProtectedRoutes, AllowedTo('parent'),getChild).delete(ProtectedRoutes, AllowedTo('parent'),deleteChild);

module.exports= router