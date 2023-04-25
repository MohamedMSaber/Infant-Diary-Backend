const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const hospitalModel = require("./hospital.model");



exports.getHospitals = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(hospitalModel.find(), req.query).paginate().fields().filter().sort()

  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ name: { $regex: word, $options: 'i' } }, { address: { $regex: word, $options: 'i' } },{ link: { $regex: word, $options: 'i' } }] })
  }
  hospitals = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, hospitals });
});
/// update hospital
exports.updateHospital = updateFun(hospitalModel);
/// Delete hospital
exports.deleteHospital = deleteFun(hospitalModel);
/// Get All hospitals
//exports.getHospitals = getAllFun(hospitalModel);
/// Get Specific hospital
exports.getHospital = getSpecficFun(hospitalModel);