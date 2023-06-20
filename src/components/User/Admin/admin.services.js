const { catchAsyncErrors } = require("../../../utils/catchAsync");
const doctorModel = require("../Doctor/doctor.model");
const hospitalModel = require("../Hospital/hospital.model");


//Get Pending Doctors
exports.getPendingDoctors = catchAsyncErrors(async(req, res)=>{
    const pendingDoctors = await doctorModel.find({isAccpeted: false});
    if (pendingDoctors) {
        res.status(200).json({pendingDoctors})
    } else {
        res.json({message:"No pending doctors"})
    }
});
//Get Pending Hospitals
exports.getPendingHospitals = catchAsyncErrors(async(req, res)=>{
    const pendingHospitals = await hospitalModel.find({isAccpeted: false});
    if (pendingHospitals) {
        res.status(200).json({pendingHospitals})
    } else {
        res.json({message:"No pending Hospitals"})
    }
});
//Accept pending doctors
exports.AccpetPendingDoctors = catchAsyncErrors(async(req, res)=>{
    const {DoctorID} = req.params;
    const doctor = await doctorModel.findByIdAndUpdate(DoctorID, { isAccpeted: 'true' }, { new: true });
    if (doctor) {
        res.status(200).json({message:"This Doctor has Been accepted", doctor});
    } else {
        res.status(401).json({message:"Invalid Doctor"});
    }
});
//Accept pending Hospitals
exports.AccpetPendingHospitals = catchAsyncErrors(async(req, res)=>{
    const {HospitalID} = req.params;
    const hospital = await hospitalModel.findByIdAndUpdate(HospitalID, { isAccpeted: 'true' }, { new: true });
    if (hospital) {
        res.status(200).json({message:"This hospital has Been accepted", hospital});
    } else {
        res.status(401).json({message:"Invalid hospital"});
    }
});
//generate bar Chart for users count

