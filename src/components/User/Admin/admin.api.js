const { addAnnouncement, addFAQ, updateFAQ, getQuestions, getQuestion, deleteQuestion, updateAnnouncement, deleteAnnouncement, getAnnouncements, getAnnouncement } = require('./admin.services');
const router=require('express').Router();

router.post("/addAnnouncement",addAnnouncement);
router.put("/:id/updateAnnouncement",updateAnnouncement);
router.delete("/:id/deleteAnnouncement",deleteAnnouncement);
router.get("/announcements",getAnnouncements);
router.get("/announcements/:id",getAnnouncement);

router.post("/addQuestion",addFAQ);
router.put("/:id/updateQuestion",updateFAQ);
router.get("/questions",getQuestions);
router.get("/questions/:id",getQuestion);
router.delete("/:id/deleteQuestion",deleteQuestion);
module.exports= router
