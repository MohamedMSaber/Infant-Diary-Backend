const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { getComment, addComment, addReply, updateComment, updateReply, deleteComment, deleteReply } = require('./comment.services');
const router=require('express').Router();



router.route('/:postID').post(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),addComment);
router.route('/commentOperation/:commentID').put(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),updateComment)
                                            .delete(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),deleteComment);
router.route('/replyOperation/:commentID/:replyID').put(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),updateReply)
                                                   .delete(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),deleteReply);
router.route('/reply/:commentID').post(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),addReply);

module.exports= router