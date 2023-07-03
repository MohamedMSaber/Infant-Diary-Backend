const { ProtectedRoutes, AllowedTo } = require('../Auth/user.auth');
const { getPendingDoctors, getPendingHospitals, AccpetPendingDoctors, AccpetPendingHospitals, generateUserCountChart, blockParents, blockDoctors, blockhospitals, getBlockedDoctors, getBlockedHospitals, getBlockedParents, ActiveSubscriberStatus, getUserById } = require('./admin.services');

const router=require('express').Router();


router.route('/usersReport').get(ProtectedRoutes,AllowedTo('admin'),generateUserCountChart);
router.route('/BlockedParents').get(ProtectedRoutes,AllowedTo('admin'),getBlockedParents);
router.route('/PendingDoctors').get(ProtectedRoutes,AllowedTo('admin'),getPendingDoctors);
router.route('/BlockedDoctors').get(ProtectedRoutes,AllowedTo('admin'),getBlockedDoctors);
router.route('/PendingHospitals').get(ProtectedRoutes,AllowedTo('admin'),getPendingHospitals);
router.route('/BlockedHospitals').get(ProtectedRoutes,AllowedTo('admin'),getBlockedHospitals);
router.route('/getuserByID/:userID').get(ProtectedRoutes,AllowedTo('admin'),getUserById);
router.route('/blockParent/:parentID').put(ProtectedRoutes,AllowedTo('admin'),blockParents);
router.route('/blockDoctor/:DoctorID').put(ProtectedRoutes,AllowedTo('admin'),blockDoctors);
router.route('/blockhospital/:HospitalID').put(ProtectedRoutes,AllowedTo('admin'),blockhospitals);
router.route('/AcceptDoctor/:DoctorID').put(ProtectedRoutes,AllowedTo('admin'),AccpetPendingDoctors);
router.route('/AcceptHospital/:HospitalID').put(ProtectedRoutes,AllowedTo('admin'),AccpetPendingHospitals);
router.route('/ActiveSubscriper/:id').get(ActiveSubscriberStatus);
module.exports= router
