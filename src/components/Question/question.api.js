const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { addFAQ, getQuestions, getQuestion, updateFAQ, deleteQuestion } = require('./question.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('admin'),addFAQ)
                 .get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getQuestions);
router.route('/:id').get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getQuestion)
                    .put(ProtectedRoutes,AllowedTo('admin'),updateFAQ)
                    .delete(ProtectedRoutes,AllowedTo('admin'),deleteQuestion);


module.exports= router
