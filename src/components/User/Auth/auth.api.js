
const { confirmEmail, signup, signIn } = require('./user.auth');

const router=require('express').Router();

router.post("/:userType/signup" , signup);
router.get("/:userType/confirmEmail/:id", confirmEmail)
router.post("/:userType/signIn", signIn)



module.exports = router