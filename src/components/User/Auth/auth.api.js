
const { uploadingSingleFile } = require('../../../utils/fileUploading');
const { confirmEmail, signup, signIn, sendCode, restPassword } = require('./user.auth');
const router=require('express').Router();

router.post('/sendCode', sendCode)
router.put('/restPassword', restPassword)
router.post("/:userType/signup" ,uploadingSingleFile('verficationImage'),signup)
router.get("/:userType/confirmEmail/:id", confirmEmail)
router.post("/:userType/signIn", signIn)



module.exports = router