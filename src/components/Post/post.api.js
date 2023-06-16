const { uploadingSingleFile } = require('../../utils/fileUploading');
const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { createPost, getPosts, getPost, deletePost, updatePost } = require('./post.services');
const router=require('express').Router();


router.route('/').post(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),uploadingSingleFile('image'),createPost);
router.route('/').get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getPosts);
router.route('/:postID').get(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),getPost)
                        .put(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),uploadingSingleFile('image'),updatePost)
                        .delete(ProtectedRoutes,AllowedTo('admin' , 'parent' ,'doctor', 'hospital'),deletePost);

module.exports= router