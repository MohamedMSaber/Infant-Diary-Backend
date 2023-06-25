const { catchAsyncErrors } = require("../../../utils/catchAsync");
const { getSpecficFun } = require("../../Handlers/handler.factory");
const hospitalModel = require("./hospital.model");
const serviceModel = require("../../Service/service.model");
const AppError = require("../../../utils/AppError");
const  cloudinary  = require("../../../utils/cloudinary");

//get all hospitals and search by hospital name and service name
exports.getHospitals = catchAsyncErrors(async (req, res) => {
  const hospitals = await hospitalModel.find({isAccpeted: true ,isBlocked: false}).populate('services', 'name age');
  const filteredHospitals = [];
  const filteredServices = [];
  // Search for hospitals with the given keyword and if input service name
  if (req.query.hospitalName) {
      hospitals.filter(hospital => {
        const hospitalName = hospital.name.toLowerCase();
        const keyword = req.query.hospitalName.toLowerCase();
        if (hospitalName.includes(keyword)) {
          filteredHospitals.push(hospital)
        }
      });
      if(filteredHospitals.length > 0) {
        
        if (req.query.serviceName) {
          for(const filteredHospital of filteredHospitals) {
            for(const service of filteredHospital.services) {
              if (service.name.includes(req.query.serviceName)) {
                filteredServices.push(filteredHospital)
              }
            }
          }
          if (filteredServices.length > 0) {
            res.json({filteredServices})
          } else {
            res.json({message:"Not Found"})
          }
        }
        else{
          res.json({filteredHospitals})
        }
      }
      else{
        res.json({message:"Not Found"})
        console.log("not");
      }
  }
  // search by service name only 
  else if(req.query.serviceName){
    hospitals.filter(hospital => {
      const hospitalServices = hospital.services;
      for (service of hospitalServices){
        if (service.name.includes(req.query.serviceName)) {
          filteredServices.push(hospital)
        }
      }
      if (filteredServices.length > 0) {
        res.json({filteredServices})
      } else {
        res.json({message:"Not Found"})
      }
    });
  }
  else{
    res.status(200).json({ hospitals });
  }
});
//get Specific Hospital
exports.getSpecificHospital = catchAsyncErrors(async (req, res) => {
  const  hospitalID  = req.params.hospitalID || req.user._id; 
  // Find the hospital by ID
  const hospital = await hospitalModel.findById(hospitalID).populate('services', 'name age');
  if (!hospital) {
    res.status(404).json({ message: 'Hospital not found' });
  }
  else{
    if (req.query.keyword){
    // Search for services with the given keyword
    const filteredServices = hospital.services.filter(service => service.name.toLowerCase().includes(req.query.keyword.toLowerCase()));
    res.status(200).json({ hospital: { ...hospital._doc, services: filteredServices } });
    }
    else {
      res.status(200).json({ hospital });
    }  
  }
  
});
//update hospital profile
exports.updateHospitalProfile = catchAsyncErrors(async (req, res) => {
  const hospitalID = req.user._id;
  const hospital = await hospitalModel.findById(hospitalID);
  if (hospital) {
    const updatedHospital = await hospitalModel.findByIdAndUpdate(hospitalID, req.body, { new: true });
    res.status(200).json({ updatedHospital, message: "your profile has been updated" });
  } else {
    res.status(404).json({ message: "can not update your profile" })
  }
});
//Delete Hospital profile
exports.deleteHospitalProfile = catchAsyncErrors(async (req, res) => {
  const  hospitalID  = req.params.hospitalID || req.user._id; 
  const hospital = await hospitalModel.findById(hospitalID);

  // if (!hospital) {
  //   return new AppError(`Hospital not found`, 404);
  // }

  if (hospital.verficationImage) {
    const public_id = hospital.verficationImage.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`hospitals Verefication Images/${public_id}`);
  }

  let deletedHospital = await hospitalModel.findByIdAndDelete(hospitalID);
    // Delete the corresponding service objects
  const serviceIDs = deletedHospital.services;
  await serviceModel.deleteMany({ _id: { $in: serviceIDs } });

  if (!deletedHospital) {
    return next(new AppError(`hospital Not Found To delete`, 404));
  }
  res.status(200).json({ message: `this hospital has Been deleted`  , deletedHospital});
  
});

// Get Specific hospital
exports.getHospital = getSpecficFun(hospitalModel);