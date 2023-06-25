const { ProtectedRoutes, AllowedTo } = require("../Auth/user.auth");
const { getUser, getAllParent, updateParentProfile, deleteParentProfile } = require("./parent.services");
const router=require('express').Router();


router.route('/parentInfo').get(ProtectedRoutes, AllowedTo('parent'),getUser);
router.route('/').get(ProtectedRoutes,AllowedTo('admin'),getAllParent)
                 .put(ProtectedRoutes,AllowedTo('parent'),updateParentProfile);
router.route('/:ParentID').delete(ProtectedRoutes,AllowedTo('admin', 'parent'),deleteParentProfile)

module.exports=router;