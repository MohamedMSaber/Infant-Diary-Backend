const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const informationModel = require("./information.model");
const childModel = require("../Child/child.model");
const getAge = require("../../utils/getAge");

// Create information
exports.createInformation = catchAsyncErrors(async (req, res) => {
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
res.status(200).json({ inforamtion });
})
// update information
exports.updateInformation = updateFun(informationModel);
// Delete information
exports.deleteInformation = deleteFun(informationModel);
// Get Specific information
exports.getSpecificInformation = getSpecficFun(informationModel);