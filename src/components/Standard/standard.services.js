const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const standardModel = require("./standard.model");



/// Create Standard
exports.createStandard = catchAsyncErrors(async (req, res) => {
    const {height,weight,headDiameter,age}= req.body;
    let standard = new standardModel (req.body);
    await standard.save();
    res.status(200).json({standard,message:"You have been created standard Successfully..."});
});

/// Edit Standard
exports.updateStandard = updateFun(standardModel);
/// Delete Standard
  exports.deleteStandard = deleteFun(standardModel);
/// Get All Standards
  exports.getStandards = getAllFun(standardModel);
/// Get Specific Standard
  exports.getStandard = getSpecficFun(standardModel);
