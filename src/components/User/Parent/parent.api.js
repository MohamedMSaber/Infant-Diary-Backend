const { signup, confirmEmail, refreshEmail, login, sendCode, forgetPassword } = require('./parent.services')

const router=require('express').Router()

router.post("/signup",signup)

router.get("/confirmEmail/:token",confirmEmail)
router.get("/refreshEmail/:id",refreshEmail)

router.post("/login",login)

router.post("/sendCode",sendCode)
router.post("/forgetPassword",forgetPassword)

module.exports=router