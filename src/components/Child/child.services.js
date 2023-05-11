const { default: mongoose } = require("mongoose");
const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const parentModel = require("../User/Parent/parent.model");
const childModel = require("./child.model");

// create new baby
exports.addChild = catchAsyncErrors(async (req, res) => {
    let child = new childModel(req.body);
    await child.save();
    const parentId = req.user._id;
    const parent =await parentModel.findById(parentId);
    parent.children.push(child._id);
    await parent.save();
    res.status(200).json({child,message:"You have been added your child Successfully..."});
  });

// update baby
exports.updateChild = catchAsyncErrors(async (req, res)=>{
  const childId = req.params;
  const parentId = req.user._id;
  const parent =await parentModel.findById(parentId);
  const childObjectId = (new mongoose.Types.ObjectId(childId));
  
  if (parent.children.some(child => child.equals(childObjectId))) {
    const { id } = req.params;
    let document = await childModel.findByIdAndUpdate(id, req.body);
    if (!document) {
        return next(new AppError(`child Not Found To Update`, 404));
    }
    res.status(200).json({ message: `child has Been Updated`  , document});
  } else {
    res.status(404).json({message: "You do not have permission to update this children."});
  }
  
})
 
// Delete baby
exports.deleteChild = catchAsyncErrors(async (req, res)=>{
  const childId = req.params;
  const parentId = req.user._id;
  const parent =await parentModel.findById(parentId);
  const childObjectId = (new mongoose.Types.ObjectId(childId));

  console.log(parent.children);
  if (parent.children.some(child => child.equals(childObjectId))) {
    const { id } = req.params;
    let document = await childModel.findByIdAndDelete(id);
    parent.children.pull(childObjectId);
    await parent.save();
    res.status(200).json({ message: `this child has Been deleted`  , document});
  } else {
    res.status(404).json({message: "You do not have permission to deelte this children."});
  }
  
})

/// Get All babies
exports.getChildren = getAllFun(childModel);
/// Get Specific baby
exports.getChild = getSpecficFun(childModel);