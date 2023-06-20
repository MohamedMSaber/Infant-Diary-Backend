const { ProtectedRoutes, AllowedTo } = require('../Auth/user.auth');
const { getPendingDoctors, getPendingHospitals, AccpetPendingDoctors, AccpetPendingHospitals, generateUserCountChart } = require('./admin.services');

const router=require('express').Router();

router.route('/usersReport').get(ProtectedRoutes,AllowedTo('admin'),generateUserCountChart)
router.route('/PendingDoctors').get(ProtectedRoutes,AllowedTo('admin'),getPendingDoctors);
router.route('/PendingHospitals').get(ProtectedRoutes,AllowedTo('admin'),getPendingHospitals);
router.route('/AcceptDoctor/:DoctorID').put(ProtectedRoutes,AllowedTo('admin'),AccpetPendingDoctors);
router.route('/AcceptHospital/:HospitalID').put(ProtectedRoutes,AllowedTo('admin'),AccpetPendingHospitals);
module.exports= router
