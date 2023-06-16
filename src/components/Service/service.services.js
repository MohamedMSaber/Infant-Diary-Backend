const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const serviceModel = require("./service.model");
const hospitalModel = require("../User/Hospital/hospital.model")



// Create Service
exports.createService = catchAsyncErrors(async (req, res) => {
  const hospitalID = req.user._id;
  const hospital = await hospitalModel.findById(hospitalID);
  let service = new serviceModel (req.body);
  await service.save();
  hospital.services.push(service._id)
  await hospital.save();
  res.status(200).json({service,message:"You have been created service Successfully..."});
});

// Edit service
exports.updateService = catchAsyncErrors(async (req, res) => {
  const userID = req.user.id;
  const {serviceID} = req.params;
  const hospitalServices = await hospitalModel.findById(userID).select('services');
  if (hospitalServices.services.includes(serviceID)) {
    const updatedService = await serviceModel.findByIdAndUpdate(serviceID, req.body,{new:true} );
    if (updatedService) {
      res.status(200).json({ message: `service has Been Updated`  , updatedService});
    }
  } else {
    res.status(404).json({message: "You do not have permission to update this service."});
  }
});

// Delete service
exports.deleteService = catchAsyncErrors(async (req, res) => {
  const userID = req.user.id;
  const {serviceID} = req.params;
  const hospitalServices = await hospitalModel.findById(userID).select('services');
  if (hospitalServices.services.includes(serviceID)) {
    const deletedService = await serviceModel.findByIdAndDelete(serviceID);
    if (deletedService) {
      res.status(200).json({ message: `service has Been deleted`  , deletedService});
    }
  } else {
    res.status(404).json({message: "You do not have permission to delete this service."});
  }
});

// Get Specific service
exports.getService = getSpecficFun(serviceModel);
