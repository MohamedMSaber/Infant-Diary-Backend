const { default: mongoose, Types } = require("mongoose");
const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const parentModel = require("../User/Parent/parent.model");
const childModel = require("./child.model");

// create new baby
exports.addChild = catchAsyncErrors(async (req, res) => {
    req.body.parentID = req.user._id;
    console.log(req.user._id);
    let child = new childModel(req.body);
    await child.save();
    res.status(200).json({child,message:"You have been added your child Successfully..."});
});

// update baby
exports.updateChild = catchAsyncErrors(async (req, res)=>{
  const childId = new mongoose.Types.ObjectId(req.params)
  const child = await childModel.findById(childId)
  const parentId = req.user._id;
  if(parentId.equals(child.parentID) ){
    let document = await childModel.findByIdAndUpdate(childId, req.body,{new:true} );
    if (!document) {
        return next(new AppError(`child Not Found To Update`, 404));
    }
    res.status(200).json({ message: `child has Been Updated`  , document});
  }
  else {
    res.status(404).json({message: "You do not have permission to update this children."});
  }
})
 
// Delete baby
exports.deleteChild = catchAsyncErrors(async (req, res)=>{
  const childId = new mongoose.Types.ObjectId(req.params);
  let child = await childModel.findById(childId)
  let parentId = req.user._id;
  if(parentId.equals(child.parentID)){
    let document = await childModel.findByIdAndDelete(childId);
    if (!document) {
      return next(new AppError(`child Not Found To Update`, 404));
    }
    res.status(200).json({ message: `this child has Been deleted`  , document});
  }
  else {
    res.status(404).json({message: "You do not have permission to deelte this children."});
  }
  
})

/// Get All babies
exports.getChildren = getAllFun(childModel);
/// Get Specific baby
exports.getChild = getSpecficFun(childModel);