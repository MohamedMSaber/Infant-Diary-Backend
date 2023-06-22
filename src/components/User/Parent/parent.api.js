const { ProtectedRoutes, AllowedTo } = require("../Auth/user.auth");
const { getUser, getAllParent, updateParentProfile } = require("./parent.services");
const router=require('express').Router();


router.route('/parentInfo').get(ProtectedRoutes, AllowedTo('parent'),getUser);
router.route('/').get(ProtectedRoutes,AllowedTo('admin'),getAllParent)
                 .put(ProtectedRoutes,AllowedTo('parent'),updateParentProfile);


module.exports=router;