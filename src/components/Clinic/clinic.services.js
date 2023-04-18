const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const clinicModel = require("./clinic.model");



/// Create clinic
exports.createClinic = catchAsyncErrors(async (req, res) => {
    const {name,email,address,city,state,zip,phone,link}= req.body;
    let clinic = new clinicModel (req.body);
    await clinic.save();
    res.status(200).json({clinic,message:"You have been created clinic Successfully..."});
});

/// update clinic
exports.updateClinic = updateFun(clinicModel);
/// Delete clinic
  exports.deleteClinic = deleteFun(clinicModel);
/// Get All clinics
  exports.getClinics = getAllFun(clinicModel);
/// Get Specific clinic
  exports.getClinic = getSpecficFun(clinicModel);
