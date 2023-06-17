const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { addAnnouncement, updateAnnouncement, deleteAnnouncement, getAnnouncements, getAnnouncementByID } = require('./announcement.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('admin'),addAnnouncement)
                 .get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getAnnouncements)

router.route('/:id').put(ProtectedRoutes,AllowedTo('admin'),updateAnnouncement)
                    .delete(ProtectedRoutes,AllowedTo('admin'),deleteAnnouncement)
                    .get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getAnnouncementByID)


module.exports= router