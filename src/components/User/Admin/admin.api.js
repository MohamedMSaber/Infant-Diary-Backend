const { addAnnouncement } = require('./admin.services');

const router=require('express').Router();

router.post("/addAnnouncement",addAnnouncement)

module.exports=router