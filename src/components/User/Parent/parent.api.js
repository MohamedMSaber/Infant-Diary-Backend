const { ProtectedRoutes, AllowedTo } = require("../Auth/user.auth");
const { getUser, getAllParent } = require("./parent.services");
const router=require('express').Router();


router.route('/parentInfo').get(ProtectedRoutes, AllowedTo('parent'),getUser);
router.route('/').get(ProtectedRoutes,AllowedTo('admin'),getAllParent)


module.exports=router;