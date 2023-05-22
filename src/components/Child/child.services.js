const { default: mongoose, Types } = require("mongoose");
const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const parentModel = require("../User/Parent/parent.model");
const childModel = require("./child.model");
const getAge = require("../../utils/getAge");
const vaccineModel = require("../Vaccine/vaccine.model");

// create new baby
exports.addChild = catchAsyncErrors(async (req, res) => {
    req.body.parentID = req.user._id;
    let child = new childModel(req.body);
    const childAge = getAge(child.birthDate);
    const childAgeInMonths = (childAge.years * 12) + childAge.months;
    const upcomingVaccines = await vaccineModel.find({ age: { $gte: childAgeInMonths } });
    upcomingVaccines.forEach(vaccine => {
      child.vaccines.push(vaccine._id);
    });
    
    await child.save();
    res.status(200).json({child,message:"You have been added your child Successfully..."});
});

// update baby
exports.updateChild = catchAsyncErrors(async (req, res)=>{
  const {childID} = req.params;
  const child = await childModel.findById(childID);
  const parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    let document = await childModel.findByIdAndUpdate(childID, req.body,{new:true} );
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
  const {childID} = req.params;
  let child = await childModel.findById(childID)
  let parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    let document = await childModel.findByIdAndDelete(childID);
    if (!document) {
      return next(new AppError(`child Not Found To Update`, 404));
    }
    res.status(200).json({ message: `this child has Been deleted`  , document});
  }
  else {
    res.status(404).json({message: "You do not have permission to deelte this children."});
  }
  
})

exports.childUpComingVaccines = catchAsyncErrors(async (req, res) => {
  const {childID} = req.params;
  const child = await childModel.findById(childID);
  const childAge = getAge(child.birthDate);
  const childAgeInMonth = (childAge.years * 12) + childAge.months;
  console.log(childAge);
  const UpComingVaccines = await vaccineModel.find({age: {$gte:childAgeInMonth} });
  if(UpComingVaccines){
  res.status(200).json({ UpComingVaccines });
  }
  else{
    res.status(404).json({message: "your child has not upComing Vaccines"});
  }
});

/// Get All babies
exports.getChildren = getAllFun(childModel);
/// Get Specific baby
exports.getChild = catchAsyncErrors(async (req, res)=>{
  const {childID} = req.params;
  let child = await childModel.findById(childID)
  let parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    let document = await childModel.findById(childID);
    if (!document) {
      return next(new AppError(`child Not Found`, 404));
    }
    res.status(200).json({ document});
  }
  else {
    res.status(404).json({message: "You do not have permission to get this child."});
  }

})