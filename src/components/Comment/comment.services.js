const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const commentModel = require("./comment.model");




/// Create Comment
exports.addComment = catchAsyncErrors(async (req, res) => {
    const {body}= req.body;
    let comment = new commentModel (req.body);
    await comment.save();
    res.status(200).json({comment,message:"You have been created comment Successfully..."});
});
exports.getComments = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(commentModel.find(), req.query).paginate().fields().filter().sort()

  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ body: { $regex: word, $options: 'i' } }] })
  }
  comments = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, comments });
});
/// Edit comment
exports.editComment = updateFun(commentModel);
/// Delete comment
  exports.deleteComment = deleteFun(commentModel);
/// Get All comments
//exports.getComments = getAllFun(commentModel);
/// Get Specific comment
  exports.getComment = getSpecficFun(commentModel);
