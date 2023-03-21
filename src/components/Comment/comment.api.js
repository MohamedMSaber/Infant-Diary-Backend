const { addComment, editComment, deleteComment, getComments, getComment } = require('./comment.services');



const router=require('express').Router();

router.post("/addComment",addComment);
router.put("/:id/editComment",editComment);
router.delete("/:id/deleteComment",deleteComment);
router.get("/comments",getComments);
router.get("/comments/:id",getComment);

module.exports= router