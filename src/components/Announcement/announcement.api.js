const { addAnnouncement, updateAnnouncement, deleteAnnouncement, getAnnouncements, getAnnouncement } = require('./announcement.services');

const router=require('express').Router();

router.post("/addAnnouncement",addAnnouncement);
router.put("/:id/updateAnnouncement",updateAnnouncement);
router.delete("/:id/deleteAnnouncement",deleteAnnouncement);
router.get("/announcements",getAnnouncements);
router.get("/announcements/:id",getAnnouncement);

module.exports= router