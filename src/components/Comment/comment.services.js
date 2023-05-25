const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const commentModel = require("./comment.model");

// Create Comment
exports.addComment = catchAsyncErrors(async (req, res) => {
    req.body.createdBy = req.user._id;
    const {postID} = req.params;
    req.body.postID = postID;
    let comment = new commentModel (req.body);
    await comment.save();
    res.status(200).json({comment,message:"You have been created comment Successfully..."});
});

// Create Reply
exports.addReply = catchAsyncErrors(async (req, res) => {
  req.body.createdBy = req.user._id;
  const {commentID} = req.params;
  req.body.commentID = commentID;
  let comment = await commentModel.findById(commentID);
  if (comment) {
    comment.reply.push(req.body);
    await comment.save();
    res.status(200).json({message:"You have been created Reply Successfully..."});
  }
});



// Edit comment
exports.editComment = updateFun(commentModel);

// Delete comment
exports.deleteComment = deleteFun(commentModel);

// Get All comments
exports.getComments = getAllFun(commentModel);

// Get Specific comment
exports.getComment = getSpecficFun(commentModel);
