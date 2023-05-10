const { ProtectedRoutes, AllowedTo } = require("../User/Auth/user.auth");
const { addChild, updateChild, deleteChild, getChildren, getChild } = require("./child.services");
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo('parent'),addChild );
router.route('').get(getChildren );
router.route('/:id').put(updateChild).get(getChild).delete(deleteChild);

module.exports= router