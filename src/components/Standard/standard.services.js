const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const standardModel = require("./standard.model");
const ApiFeatures = require("../../utils/ApiFeatures");



// Create Standard
exports.createStandard = catchAsyncErrors(async (req, res) => {
    let standard = new standardModel (req.body);
    await standard.save();
    res.status(200).json({standard,message:"You have been created standard Successfully..."});
});
//get All Standard
exports.getStandards = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(standardModel.find(), req.query).paginate().fields().filter().search().sort()
  Products = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, Products });
});
// Edit Standard
exports.updateStandard = updateFun(standardModel);
// Delete Standard
exports.deleteStandard = deleteFun(standardModel);
// Get Specific Standard
exports.getStandard = getSpecficFun(standardModel);
