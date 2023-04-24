const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures");
const vaccineModel = require("./vaccine.model");



/// Create Vaccine
exports.createVaccine = catchAsyncErrors(async (req, res) => {
    const {name,compulsory,dose,age,sideEffects,reason}= req.body;
    let vaccine = new vaccineModel (req.body);
    await vaccine.save();
    res.status(200).json({vaccine,message:"You have been created vaccine Successfully..."});
});

exports.getVaccines = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(vaccineModel.find(), req.query).paginate().fields().filter().sort()
  Products = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, Products });
});
/// Edit Vaccine
exports.updateVaccine = updateFun(vaccineModel);
/// Delete Vaccine
  exports.deleteVaccine = deleteFun(vaccineModel);
/// Get All Vaccines
//exports.getVaccines = getAllFun(vaccineModel);
/// Get Specific Vaccine
  exports.getVaccine = getSpecficFun(vaccineModel);