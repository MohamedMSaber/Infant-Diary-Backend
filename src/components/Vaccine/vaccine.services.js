const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures");
const vaccineModel = require("./vaccine.model");

// Create Vaccine
exports.createVaccine = catchAsyncErrors(async (req, res) => {
    const {name,compulsory,dose,age,sideEffects,reason}= req.body;
    let vaccine = new vaccineModel (req.body);
    await vaccine.save();
    res.status(200).json({vaccine,message:"You have been created vaccine Successfully..."});
});
//get Vaccine
exports.getVaccines = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(vaccineModel.find(), req.query).paginate().fields().filter().sort()
  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ name: { $regex: word, $options: 'i' } }, { compulsory: { $regex: word, $options: 'i' } },{ sideEffects: { $regex: word, $options: 'i' } },{ reason: { $regex: word, $options: 'i' } }] })
  }
  vaccines = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, vaccines });
});
// Edit Vaccine
exports.updateVaccine = updateFun(vaccineModel);
// Delete Vaccine
exports.deleteVaccine = deleteFun(vaccineModel);
// Get Specific Vaccine
exports.getVaccine = getSpecficFun(vaccineModel);