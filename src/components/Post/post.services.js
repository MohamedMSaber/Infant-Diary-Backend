const { catchAsyncErrors } = require("../../utils/catchAsync");
const { getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const postModel = require("./post.model");
const cloudinary = require('../../utils/cloudinary');
const commentModel = require("../Comment/comment.model");

// Create Post
exports.createPost = catchAsyncErrors(async (req, res) => {
  if (req.file && req.file.path) {
    const image =await  cloudinary.uploader.upload(req.file.path , {folder: "Posts"})
    req.body.image =  image.secure_url;
  }
  req.body.createdBy = req.user._id;
  req.body.createdByModel = req.user.role;
  let newPost = new postModel(req.body);
  await newPost.save();
  res.status(200).json({newPost,message:"You have been created post Successfully..."});
});
// get All Posts
exports.getPosts = catchAsyncErrors(async (req, res) => {
  req.query.sort = '-createdAt';
  let apiFeatures = new ApiFeatures(postModel.find(), req.query).paginate().fields().filter().sort();
  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ body: { $regex: word, $options: 'i' } }] })
  }
  apiFeatures.mongooseQuery.populate({
    path: 'createdBy',
    select: 'name -_id' 
  });
  posts = await apiFeatures.mongooseQuery
  
  res.status(200).json({ page: apiFeatures.page, posts });
});
// update Post
exports.updatePost = catchAsyncErrors(async (req, res)=>{
  const {postID} = req.params;
  const post = await postModel.findById(postID);
  const parentId = req.user._id;
  if(post.createdBy.equals(parentId)){
    if (req.file && req.file.path){
      // Delete the old image if it exists
      if (post.image) {
        const public_id = post.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`Posts/${public_id}`);
      }  
      const image =await  cloudinary.uploader.upload(req.file.path , {folder: "Posts"})
      req.body.image =  image.secure_url;
    }
    let updatedPost = await postModel.findByIdAndUpdate(postID, req.body,{new:true} );
    if (!updatedPost) {
        return next(new AppError(`post Not Found To Update`, 404));
    }
    res.status(200).json({ message: `post has Been Updated`  , updatedPost});
  }
  else {
    res.status(404).json({message: "You do not have permission to update this post."});
  }
})
// Delete the post
exports.deletePost = catchAsyncErrors(async (req, res)=>{
  const {postID} = req.params;
  const post = await postModel.findById(postID);
  const parentId = req.user._id;
  if(post.createdBy.equals(parentId)){
    // Delete the old image if it exists
    if (post.image) {
      const public_id = post.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`Posts/${public_id}`);
    }
    let deletedPost = await postModel.findByIdAndDelete(postID);
    await commentModel.deleteMany({postID: postID})
    if (!deletedPost) {
        return next(new AppError(`post Not Found To delete`, 404));
    }
    res.status(200).json({ message: `post has Been deleted`});
  }
  else {
    res.status(404).json({message: "You do not have permission to delete this post."});
  }
})
// Get Specific Post
exports.getPost = catchAsyncErrors(async (req, res) => {
  const {postID} = req.params;
  const post  = await postModel.findById(postID).populate('createdBy', 'name _id');
  if (post) {
    res.status(200).json({post})
  } else {
    res.status(404).json({message:'Invalid Post ID'});
  }
});


