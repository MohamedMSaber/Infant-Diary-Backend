const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createPost, getPosts, getPost, editPost, deletePost } = require('./post.services');
const router=require('express').Router();


router.route('').post(ProtectedRoutes,AllowedTo('admin'),createPost);
router.route('').get(getPosts);
router.route('/:id').get(getPost).put(editPost).delete(deletePost);

module.exports= router