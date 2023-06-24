const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { getComment, addComment, addReply, updateComment, updateReply } = require('./comment.services');
const router=require('express').Router();



router.route('/:postID').post(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),addComment)
                        .get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getComment);
router.route('/updateComment/:commentID').put(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),updateComment);
router.route('/updateReply/:commentID/:replyID').put(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),updateReply);
router.route('/reply/:commentID').post(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),addReply);

module.exports= router