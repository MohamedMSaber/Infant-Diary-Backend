const { ProtectedRoutes, AllowedTo } = require('../Auth/user.auth');
const { getDoctors, getDoctorInfo, getDoctor, updateDoctorProfile, deleteDocotorProfile, viewDoctorProfile, ratingDoctor } = require('./doctor.services');

const router=require('express').Router();

router.route('/').get(ProtectedRoutes,AllowedTo('parent', 'admin', 'doctor', 'hospital'),getDoctors)
                 .put(ProtectedRoutes,AllowedTo('doctor'),updateDoctorProfile);
router.route('/DoctorInfo').get(ProtectedRoutes,getDoctorInfo)
router.route('/:doctorID').get(ProtectedRoutes,AllowedTo('parent', 'admin', 'doctor', 'hospital'),getDoctor)
                          .delete(ProtectedRoutes,AllowedTo('admin', 'doctor'),deleteDocotorProfile)
                          .put(ProtectedRoutes,AllowedTo('parent'),ratingDoctor)



module.exports = router;