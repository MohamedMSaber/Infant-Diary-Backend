const { ProtectedRoutes, AllowedTo } = require('../Auth/user.auth');
const { getDoctors } = require('./doctor.services');

const router=require('express').Router();

router.route('').get(ProtectedRoutes,getDoctors);

module.exports = router;