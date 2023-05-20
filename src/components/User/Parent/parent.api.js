const { ProtectedRoutes, AllowedTo } = require("../Auth/user.auth");
const { getUser } = require("./parent.services");
const router=require('express').Router();


router.route('/').get(ProtectedRoutes, AllowedTo('parent'),getUser);


module.exports=router;