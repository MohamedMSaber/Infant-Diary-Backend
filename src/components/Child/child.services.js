const { default: mongoose, Types } = require("mongoose");
const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const parentModel = require("../User/Parent/parent.model");
const childModel = require("./child.model");
const getAge = require("../../utils/getAge");
const vaccineModel = require("../Vaccine/vaccine.model");
const cloudinary = require("../../utils/cloudinary");

// create new baby
exports.addChild = catchAsyncErrors(async (req, res) => {
    if (req.file && req.file.path) {
      const image =await  cloudinary.uploader.upload(req.file.path , {folder: "children"})
      req.body.childPic =  image.secure_url;
    }
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
    if (req.file && req.file.path) {
      // Delete the old image if it exists
      if (child.childPic) {
        const public_id = child.childPic.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`children/${public_id}`);
      } 
      const image =await  cloudinary.uploader.upload(req.file.path , {folder: "children"})
      req.body.childPic =  image.secure_url;
    }
    let child = await childModel.findByIdAndUpdate(childID, req.body,{new:true} );
    if (!child) {
        return next(new AppError(`child Not Found To Update`, 404));
    }
    res.status(200).json({ message: `child has Been Updated`  , child});
  }
  else {
    res.status(404).json({message: "You do not have permission to update this children."});
  }
})
 
exports.takeVaccine = catchAsyncErrors(async (req, res)=>{
  const {vaccineID , childID} = req.params;
  const parentID = req.user._id;
  const child = await childModel.findById(childID);
  if (child.parentID.equals(parentID)){ 
      child.vaccines.pull(vaccineID);
      child.takenVaccines.push(vaccineID);
      await child.save();
      res.status(200).json({ message: `vaccine has been taken` , child});
  }
  else {
      res.status(404).json({message: "You do not have permission to mark this vaccine for this child."});
    }
  
})

// Delete baby
exports.deleteChild = catchAsyncErrors(async (req, res)=>{
  const {childID} = req.params;
  let child = await childModel.findById(childID)
  let parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    // Delete the old image if it exists
    if (child.childPic) {
      const public_id = post.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`children/${public_id}`);
    }
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

// Get All babies
exports.getChildren = getAllFun(childModel);

// Get Specific baby
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