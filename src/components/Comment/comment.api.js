const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { getComment, addComment, addReply, updateComment, updateReply, deleteComment, deleteReply } = require('./comment.services');
const router=require('express').Router();



router.route('/:postID').post(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),addComment);
router.route('/operation/:commentID').put(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),updateComment)
                                     .delete(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),deleteComment);


module.exports= router