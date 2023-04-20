
const { uploadingSingleFile } = require('../../../utils/fileUploading');
const { confirmEmail, signup, signIn } = require('./user.auth');
const router=require('express').Router();

router.post("/:userType/signup" ,uploadingSingleFile('nationalIdPhoto','ID'),signup)
router.get("/:userType/confirmEmail/:id", confirmEmail)
router.post("/:userType/signIn", signIn)



module.exports = router