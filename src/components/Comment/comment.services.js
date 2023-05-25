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
  req.body.createdBy = req.user._id;
  const {commentID} = req.params;
  let comment = await commentModel.findById(commentID);
  if (comment) {
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

// Edit comment
exports.editComment = updateFun(commentModel);

// Delete comment
exports.deleteComment = deleteFun(commentModel);

// Get All comments
exports.getComments = getAllFun(commentModel);

// Get Specific comment
exports.getComment = getSpecficFun(commentModel);
