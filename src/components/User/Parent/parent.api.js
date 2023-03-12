const { signup, confirmEmail, signIn } = require('./parent.auth')


const router=require('express').Router()

router.post("/signup",signup)
router.get("/confirmEmail/:id",confirmEmail)
router.post("/signIn",signIn)
// router.get("/refreshEmail/:id",refreshEmail)



// router.post("/sendCode",sendCode)
// router.post("/forgetPassword",forgetPassword)

module.exports=router