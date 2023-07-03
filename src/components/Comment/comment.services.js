const { catchAsyncErrors } = require("../../utils/catchAsync");
const { getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const commentModel = require("./comment.model");
const sendEmail = require("../../utils/sendEmail");
const parentModel = require('../User/Parent/parent.model')
const doctorModel = require('../User/Doctor/doctor.model');
const adminModel = require('../User/Admin/admin.model')
const postModel = require("../Post/post.model")

// Create Comment
exports.addComment = catchAsyncErrors(async (req, res) => {
  const {postID} = req.params;  
  req.body.postID = postID;
  req.body.createdBy = req.user._id;
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
// Get All comments
exports.getComments = getAllFun(commentModel);
// Get Specific comment
exports.getComment = getSpecficFun(commentModel);
