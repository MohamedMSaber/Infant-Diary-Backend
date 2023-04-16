const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const vaccineModel = require("./vaccine.model");



/// Create Vaccine
exports.createVaccine = catchAsyncErrors(async (req, res) => {
    const {name,compulsory,dose,age,sideEffects,reason}= req.body;
    let vaccine = new vaccineModel (req.body);
    await vaccine.save();
    res.status(200).json({vaccine,message:"You have been created vaccine Successfully..."});
});

/// Edit Vaccine
exports.updateVaccine = updateFun(vaccineModel);
/// Delete Vaccine
  exports.deleteVaccine = deleteFun(vaccineModel);
/// Get All Vaccines
  exports.getVaccines = getAllFun(vaccineModel);
/// Get Specific Vaccine
  exports.getVaccine = getSpecficFun(vaccineModel);