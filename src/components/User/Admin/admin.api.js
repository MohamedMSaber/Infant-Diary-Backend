const { addAnnouncement, addFAQ } = require('./admin.services');

const router=require('express').Router();

router.post("/addAnnouncement",addAnnouncement)
router.post("/addQuestion",addFAQ)

module.exports=router