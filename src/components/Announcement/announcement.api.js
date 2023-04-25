const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { addAnnouncement, updateAnnouncement, deleteAnnouncement, getAnnouncements, getAnnouncementByID } = require('./announcement.services');
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo(['admin']),addAnnouncement);
router.route('').get(getAnnouncements);
router.route('/:id').get(getAnnouncementByID).put(updateAnnouncement).delete(deleteAnnouncement);


module.exports= router