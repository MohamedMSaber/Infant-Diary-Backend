const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const commentModel = require("./comment.model");
const sendEmail = require("../../utils/sendEmail");
const parentModel = require('../User/Parent/parent.model')
const doctorModel = require('../User/Doctor/doctor.model');
const adminModel = require('../User/Admin/admin.model')
const postModel = require("../Post/post.model")

// Create Comment
exports.addComment = catchAsyncErrors(async (req, res) => {
    req.body.createdBy = req.user._id;
    const {postID} = req.params;
    req.body.postID = postID;
    req.body.createdByModel = req.user.role;
    let comment = new commentModel (req.body);
    await comment.save();
    const post = await postModel.findById(postID);
    if(post){
      const ownerID = post.createdBy;
      // Search for the user in all 3 models
      const parent = await parentModel.findById(ownerID);
      const doctor = await doctorModel.findById(ownerID);
      const admin = await adminModel.findById(ownerID);
      const user = parent || doctor || admin;
      if (user && !user._id.equals(req.user._id) ) {
        let htmlBody = `${req.user.name} commented on you post`
        sendEmail(user.email , htmlBody , "Post Notification")
      }
    }
    res.status(200).json({comment,message:"You have been created comment Successfully..."});
});
// Create Reply
exports.addReply = catchAsyncErrors(async (req, res) => {
  const {commentID} = req.params;
  let comment = await commentModel.findById(commentID);
  if (comment) {
    req.body.createdBy = req.user._id;
    req.body.createdWith = req.user.role;
    console.log(req.user.role);
    comment.reply.push(req.body);
    await comment.save();
    const ownerID = comment.createdBy;
    // Search for the user in all 3 models
    const parent = await parentModel.findById(ownerID);
    const doctor = await doctorModel.findById(ownerID);
    const admin = await adminModel.findById(ownerID);
    const user = parent || doctor || admin;
    if (user && !user._id.equals(req.user._id) ) {
        let htmlBody = `${req.user.name} reply on you comment`
        sendEmail(user.email , htmlBody , "comment Notification")
    }
    res.status(200).json({message:"You have been created Reply Successfully..."});
  }
});
// Update comment
exports.updateComment = catchAsyncErrors(async (req,res)=>{
  const userID = req.user._id;
  const {commentID} = req.params;
  const comment = await commentModel.findById(commentID);
  if(comment.createdBy.equals(userID)){
    let updatedComment = await commentModel.findByIdAndUpdate(commentID, req.body,{new:true} );
    if (!updatedComment) {
      return next(new AppError(`Comment Not Found To Update`, 404));
    }
    res.status(200).json({ message: `Comment has Been Updated`  , updatedComment});
  }
  else {
  res.status(404).json({message: "You do not have permission to update this Comment."});
  }
})
// Update Reply
exports.updateReply = catchAsyncErrors(async (req,res)=>{
  const userID = req.user._id;
  const {commentID, replyID} = req.params;
  const comment = await commentModel.findById(commentID);
  // Check if the comment has the specified reply
  const replyIndex = comment.reply.findIndex((r) => r._id.equals(replyID));
  if (replyIndex !== -1 && comment.reply[replyIndex].createdBy.equals(userID)) {
    // Update the properties of the reply
    comment.reply[replyIndex].body = req.body.body;
    // Save the updated comment
    const updatedComment = await comment.save();
    res.status(200).json({ message: 'Reply updated successfully', updatedComment });
  } 
  else {
  res.status(404).json({message: 'Reply not found or unauthorized'});
  }
})
// Delete comment
exports.deleteComment = catchAsyncErrors(async (req,res)=>{
  const {commentID} = req.params;
  const userID = req.user._id;
  const comment = await commentModel.findById(commentID);
  if(comment.createdBy.equals(userID)){
      let deletedComment = await commentModel.findByIdAndDelete(commentID);
      if (!deletedComment) {
          return next(new AppError(`comment Not Found To delete`, 404));
      }
      res.status(200).json({ message: `comment has Been deleted`});
  } 
  else {
    res.status(404).json({message: "You do not have permission to delete this comment."});
  }
})
// Delete Reply
exports.deleteReply = catchAsyncErrors(async (req,res)=>{
  const userID = req.user._id;
  const {commentID, replyID} = req.params;
  const comment = await commentModel.findById(commentID);
  // Check if the comment has the specified reply
  const replyIndex = comment.reply.findIndex((r) => r._id.equals(replyID));
  if (replyIndex !== -1 && comment.reply[replyIndex].createdBy.equals(userID)) {
    // Filter out the reply to be deleted
    comment.reply = comment.reply.filter((reply) => !reply._id.equals(replyID));
    // Save the updated comment
    const updatedComment = await comment.save();
    res.status(200).json({ message: 'Reply deleted successfully', updatedComment });
  } 
  else {
  res.status(404).json({message: 'Reply not found or unauthorized'});
  }
})

// Get All comments
exports.getComments = getAllFun(commentModel);

// Get Specific comment
exports.getComment = getSpecficFun(commentModel);
