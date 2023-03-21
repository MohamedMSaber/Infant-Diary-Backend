const { createPost, editPost, deletePost, getPosts, getPost } = require('./post.services');


const router=require('express').Router();

router.post("/createPost",createPost);
router.put("/:id/editPost",editPost);
router.delete("/:id/deletePost",deletePost);
router.get("/posts",getPosts);
router.get("/posts/:id",getPost);

module.exports= router