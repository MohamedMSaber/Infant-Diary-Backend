const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { addReply, updateReply, deleteReply } = require('./reply.services');
const router=require('express').Router();



router.route('/:commentID').post(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),addReply);
router.route('/operation/:replyID').put(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),updateReply)
                                   .delete(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),deleteReply);

module.exports= router