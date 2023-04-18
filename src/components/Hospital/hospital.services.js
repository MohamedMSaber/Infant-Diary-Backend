const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const hospitalModel = require("./hospital.model");



/// update hospital
exports.updateHospital = updateFun(hospitalModel);
/// Delete hospital
  exports.deleteHospital = deleteFun(hospitalModel);
/// Get All hospitals
  exports.getHospitals = getAllFun(hospitalModel);
/// Get Specific hospital
  exports.getHospital = getSpecficFun(hospitalModel);