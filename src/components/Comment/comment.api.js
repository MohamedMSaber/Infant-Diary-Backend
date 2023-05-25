const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { getComment, addComment, addReply } = require('./comment.services');
const router=require('express').Router();



router.route('/:postID').post(ProtectedRoutes,AllowedTo('parent' , 'doctor'),addComment).get(getComment);
router.route('/reply/:commentID').post(ProtectedRoutes,AllowedTo('parent' , 'doctor'),addReply)

module.exports= router