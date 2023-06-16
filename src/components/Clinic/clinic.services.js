const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const clinicModel = require("./clinic.model");

// Create clinic
exports.createClinic = catchAsyncErrors(async (req, res) => {
  req.body.doctorID = req.user._id;
  let clinic = new clinicModel(req.body);
  await clinic.save();
  res.status(200).json({clinic,message:"You have been created clinic Successfully..."});
});

exports.getClinics = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(clinicModel.find(), req.query).paginate().fields().filter().sort()
  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ name: { $regex: word, $options: 'i' } }, { address: { $regex: word, $options: 'i' } },{ link: { $regex: word, $options: 'i' } }] })
  }
  clinics = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, clinics });
});

// update clinic
exports.updateClinic = catchAsyncErrors(async (req, res)=>{
  const {clincID} = req.params;
  const clinic = await clinicModel.findById(clincID);
  const doctorID = req.user._id;
  if(clinic.doctorID.equals(doctorID)){
    let updatedclinic = await clinicModel.findByIdAndUpdate(clincID, req.body,{new:true} );
    if (!updatedclinic) {
        return next(new AppError(`clinic Not Found To Update`, 404));
    }
    res.status(200).json({ message: `clinic has Been Updated`  , updatedclinic});
  }
  else {
    res.status(404).json({message: "You do not have permission to update this clinic."});
  }
})

// Delete clinic
exports.deleteclinic = catchAsyncErrors(async (req, res)=>{
  const {clinicID} = req.params;
  const clinic = await clinicModel.findById(clinicID);
  const doctorID = req.user._id;
  console.log(doctorID);
  if(clinic.doctorID.equals(doctorID)){
    let deletedclinic = await clinicModel.findByIdAndDelete(clinicID);
    if (!deletedclinic) {
        return next(new AppError(`clinic Not Found To delete`, 404));
    }
    res.status(200).json({ message: `clinic has Been deleted`});
  }
  else {
    res.status(404).json({message: "You do not have permission to delete this clinic."});
  }
})

// Get Specific clinic
exports.getClinic = getSpecficFun(clinicModel);
