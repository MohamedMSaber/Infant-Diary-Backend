const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { addAnnouncement, updateAnnouncement, deleteAnnouncement, getAnnouncements, getAnnouncement } = require('./announcement.services');
const router=require('express').Router();


router.route('/:userType/announcement').post(ProtectedRoutes,AllowedTo(['admin']),addAnnouncement)

// router.post("/addAnnouncement",addAnnouncement);
// router.put("/:id/updateAnnouncement",updateAnnouncement);
// router.delete("/:id/deleteAnnouncement",deleteAnnouncement);
// router.get("/announcements",getAnnouncements);
// router.get("/announcements/:id",getAnnouncement);

module.exports= router