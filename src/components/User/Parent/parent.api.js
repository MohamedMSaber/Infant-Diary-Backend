const {  confirmEmail, signIn } = require('../Auth/user.auth');
const { addChild } = require('./parent.services');
// const{signup} = require('../user.auth')

const router=require('express').Router();

// router.post("/:userType/signup",signup)
// router.get("/:userType/confirmEmail/:id",confirmEmail)
router.post("/signIn",signIn)
// router.get("/refreshEmail/:id",refreshEmail)


router.post("/addChild" ,addChild );


// router.post("/sendCode",sendCode)
// router.post("/forgetPassword",forgetPassword)

module.exports=router