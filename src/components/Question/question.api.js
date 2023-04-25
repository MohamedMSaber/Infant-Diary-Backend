const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { addFAQ, getQuestions, getQuestion, updateFAQ, deleteQuestion } = require('./question.services');
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo(['admin']),addFAQ);
router.route('').get(getQuestions);
router.route('/:id').get(getQuestion).put(updateFAQ).delete(deleteQuestion);


module.exports= router
