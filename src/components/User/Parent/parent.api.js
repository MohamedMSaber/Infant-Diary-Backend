const { signup, confirmEmail } = require('./parent.auth')


const router=require('express').Router()

router.post("/signup",signup)
router.get("/confirmEmail/:id",confirmEmail)
// router.get("/refreshEmail/:id",refreshEmail)

// router.post("/login",login)

// router.post("/sendCode",sendCode)
// router.post("/forgetPassword",forgetPassword)

module.exports=router