const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { getComments, getComment, editComment, deleteComment, addComment } = require('./comment.services');
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo(['admin']),addComment);
router.route('').get(getComments);
router.route('/:id').get(getComment).put(editComment).delete(deleteComment);

module.exports= router