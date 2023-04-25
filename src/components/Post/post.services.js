const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const postModel = require("./post.model");



/// Create Post
exports.createPost = catchAsyncErrors(async (req, res) => {
    const {body}= req.body;
    let post = new postModel (req.body);
    await post.save();
    res.status(200).json({post,message:"You have been created post Successfully..."});
});
exports.getPosts = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(postModel.find(), req.query).paginate().fields().filter().sort()

  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ body: { $regex: word, $options: 'i' } }] })
  }
  posts = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, posts });
});

/// Edit Post
exports.editPost = updateFun(postModel);
/// Delete Post
  exports.deletePost = deleteFun(postModel);
/// Get All Posts
//exports.getPosts = getAllFun(postModel);
/// Get Specific Post
  exports.getPost = getSpecficFun(postModel);


