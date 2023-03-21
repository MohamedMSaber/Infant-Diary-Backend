const {  addFAQ, updateFAQ, getQuestions, getQuestion, deleteQuestion } = require('./question.services');
const router=require('express').Router();


router.post("/addQuestion",addFAQ);
router.put("/:id/updateQuestion",updateFAQ);
router.get("/questions",getQuestions);
router.get("/questions/:id",getQuestion);
router.delete("/:id/deleteQuestion",deleteQuestion);
module.exports= router


