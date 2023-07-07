const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const informationModel = require("./information.model");
const childModel = require("../Child/child.model");
const getAge = require("../../utils/getAge");
const cloudinary = require("../../utils/cloudinary");
// Create information
exports.createInformation = catchAsyncErrors(async (req, res) => {
    if (req.file && req.file.path) {
      const image =await  cloudinary.uploader.upload(req.file.path , {folder: "information"})
      req.body.image =  image.secure_url;
    }
    let information = new informationModel (req.body);
    await information.save();
    res.status(200).json({information,message:"You have been created information Successfully..."});
});
//get inforamtion for specific child
exports.getInformation = catchAsyncErrors(async (req, res) => {
  const {childId} = req.params;
  // Find the child by ID
  const child = await childModel.findById(childId);
  if (!child) {
    return res.status(404).json({ message: 'Child not found' });
  }
  // Get the child's age
  const childAge = getAge(child.birthDate); // Implement your own logic to calculate the age
  const childAgeInMonth = (childAge.years * 12) + childAge.months ;
  // Find instructions suitable for the child's age
  const information = await informationModel.find({ age: { $lte: childAgeInMonth } });
  res.status(200).json({ child, information });
});
//get All information
exports.getAllInformation = catchAsyncErrors(async (req, res) => {
    const inforamtion  = await informationModel.find();
    if (req.query.keyword) {
      let word = req.query.keyword
      inforamtion.mongooseQuery.find({ $or: [{ age: { $regex: word, $options: 'i' } },{ body: { $regex: word, $options: 'i' } }, { topic: { $regex: word, $options: 'i' } }] })
    }
    res.status(200).json({ inforamtion });
})
//update information
exports.updateInformation = catchAsyncErrors(async (req, res)=>{
  const {id} = req.params;
  const inforamtion = await informationModel.findById(id);
  if (req.file && req.file.path){
    // Delete the old image if it exists
    if (inforamtion.image) {
      const public_id = inforamtion.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`information/${public_id}`);
    }  
    const image =await  cloudinary.uploader.upload(req.file.path , {folder: "information"})
    req.body.image =  image.secure_url;
  }
  let updatedInformation = await informationModel.findByIdAndUpdate(id, req.body, {new:true});
  if (!updatedInformation) {
      return next(new AppError(`post Not Found To Update`, 404));
  }
  res.status(200).json({ message: `information has Been Updated`  , updatedInformation});
})
// Delete information
exports.deleteInformation = catchAsyncErrors(async (req, res)=>{
  const {id} = req.params;
  const inforamtion = await informationModel.findById(id);
  // Delete the old image if it exists
  if (inforamtion.image) {
    const public_id = inforamtion.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`information/${public_id}`);
  }
  let deletedinformation = await informationModel.findByIdAndDelete(id);
  if (!deletedinformation) {
      return next(new AppError(`post Not Found To delete`, 404));
  }
  res.status(200).json({ message: `inforamtion has Been deleted`});
  
})
// Get Specific information
exports.getSpecificInformation = getSpecficFun(informationModel);