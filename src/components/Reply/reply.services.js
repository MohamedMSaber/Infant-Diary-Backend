const { catchAsyncErrors } = require("../../utils/catchAsync");
const sendEmail = require("../../utils/sendEmail");
const commentModel = require("../Comment/comment.model");
const adminModel = require("../User/Admin/admin.model");
const doctorModel = require("../User/Doctor/doctor.model");
const parentModel = require("../User/Parent/parent.model");
const replyModel = require("./reply.model");

// Create Reply
exports.addReply = catchAsyncErrors(async (req, res) => {
  const {commentID} = req.params;
  req.body.commentID = commentID
  req.body.createdBy = req.user._id;
  req.body.createdByModel = req.user.role;
  let reply = new replyModel(req.body);
  await reply.save();
  let comment = await commentModel.findById(commentID);
  if (comment) {
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
    res.status(200).json({reply,message:"You have been created Reply Successfully..."});
  }
});
// Update Reply
exports.updateReply = catchAsyncErrors(async (req,res)=>{
  const {replyID} = req.params;
  const reply = await replyModel.findById(replyID);
  const userID = req.user._id;
  if(reply.createdBy.equals(userID)){
    let updatedreply = await replyModel.findByIdAndUpdate(replyID, req.body,{new:true} );
    if (!updatedreply) {
        return next(new AppError(`reply Not Found To Update`, 404));
    }
    res.status(200).json({ message: `reply has Been Updated`  , updatedreply});
  }
  else {
    res.status(404).json({message: "You do not have permission to update this reply."});
  }
})
// Delete Reply
exports.deleteReply = catchAsyncErrors(async (req,res)=>{
  const userID = req.user._id;
  const {replyID} = req.params;
  const reply = await replyModel.findById(replyID);
  if(reply.createdBy.equals(userID)){
    let deletedReply = await replyModel.findByIdAndDelete(replyID);
    if (!deletedReply) {
        return next(new AppError(`comment Not Found To delete`, 404));
    }
    res.status(200).json({ message: `comment has Been deleted`});
  } 
  else {
    res.status(404).json({message: "You do not have permission to delete this comment."});
  }
})