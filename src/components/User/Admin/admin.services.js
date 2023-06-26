const { catchAsyncErrors } = require("../../../utils/catchAsync");
const doctorModel = require("../Doctor/doctor.model");
const hospitalModel = require("../Hospital/hospital.model");
const parentModel = require("../Parent/parent.model");
const childModel = require("../../Child/child.model");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const db = require('../../../utils/firebaseConfig');
const { collection, doc, setDoc } = require("firebase/firestore");
//Get Blocked Parents
exports.getBlockedParents = catchAsyncErrors(async(req, res)=>{
  const BlockedParents = await parentModel.find({isBlocked: true});
  if (BlockedParents.length >0) {
      res.status(200).json({BlockedParents})
  } else {
      res.json({message:"No Blocked Parents"})
  }
});
//Block and UnBlock Parent
exports.blockParents = catchAsyncErrors(async(req, res)=>{
  const {parentID} = req.params;
  const {isBlocked} = await parentModel.findById(parentID);
  const parent = await parentModel.findByIdAndUpdate(parentID, { isBlocked: !isBlocked }, { new: true });
  if (parent && !isBlocked) {
    res.status(200).json({message:"This parent has Been Blocked", parent});
  }
  else if (parent && isBlocked){
    res.status(200).json({message:"This parent has Been UnBlocked", parent});
  }
  else {
    res.status(401).json({message:"Invalid parent ID"});
  }
})
//Get Pending Doctors
exports.getPendingDoctors = catchAsyncErrors(async(req, res)=>{
    const pendingDoctors = await doctorModel.find({isAccpeted: false});
    if (pendingDoctors) {
        res.status(200).json({pendingDoctors})
    } else {
        res.json({message:"No pending doctors"})
    }
});
//Get Blocked Doctors
exports.getBlockedDoctors = catchAsyncErrors(async(req, res)=>{
  const BlockedDoctors = await doctorModel.find({isBlocked: true});
  if (BlockedDoctors.length >0) {
      res.status(200).json({BlockedDoctors})
  } else {
      res.json({message:"No Blocked doctors"})
  }
});
//Accept pending doctors or unBlock
exports.AccpetPendingDoctors = catchAsyncErrors(async(req, res)=>{
  const {DoctorID} = req.params;
  const {isBlocked, isAccpeted} = await doctorModel.findById(DoctorID);
  const doctor = await doctorModel.findByIdAndUpdate(DoctorID, { isAccpeted: 'true' ,isBlocked:'false' }, { new: true });
  if (doctor && !isBlocked && !isAccpeted) {
  // Save user in Firebase
    const user = {
        email:doctor.email,
        name:doctor.name,
        role:'doctor',
        photoURL:"https://cdn-icons-png.flaticon.com/512/1021/1021566.png"
    };
    // Get the users collection
    const usersCollectionRef = collection(db, "users");
    // Create a new document with the user's ID
    const userDocRef = doc(usersCollectionRef, doctor._id.toString());
    // Set the user document data
    await setDoc(userDocRef, user);
    res.status(200).json({message:"This Doctor has Been accepted", doctor});
  }
  else if(isBlocked){
    res.status(200).json({message:"This Doctor has Been UnBlocked", doctor});
  } else {
      res.status(401).json({message:"Invalid Doctor"});
  }
});
//block doctor
exports.blockDoctors = catchAsyncErrors(async(req, res)=>{
  const {DoctorID} = req.params;
  const doctor = await doctorModel.findByIdAndUpdate(DoctorID, { isBlocked:'true' }, { new: true });
  if (doctor) {
    res.status(200).json({message:"This doctor has Been Blocked", doctor});
  }
  else {
    res.status(401).json({message:"Invalid Doctor ID"});
  }
})
//Get Pending Hospitals 
exports.getPendingHospitals = catchAsyncErrors(async(req, res)=>{
    const pendingHospitals = await hospitalModel.find({isAccpeted: false});
    if (pendingHospitals) {
        res.status(200).json({pendingHospitals})
    } else {
        res.json({message:"No pending Hospitals"})
    }
});
//Get Blocked Hospitals 
exports.getBlockedHospitals = catchAsyncErrors(async(req, res)=>{
  const BlockedHospitals = await hospitalModel.find({isBlocked: true});
  if (BlockedHospitals.length >0) { 
      res.status(200).json({BlockedHospitals})
  } else {
      res.json({message:"No Blocked Hospitals"})
  }
});
//Accept pending Hospitals or unBlock
exports.AccpetPendingHospitals = catchAsyncErrors(async(req, res)=>{
    const {HospitalID} = req.params;
    const {isBlocked, isAccpeted} = await hospitalModel.findById(HospitalID);
    const hospital = await hospitalModel.findByIdAndUpdate(HospitalID, { isAccpeted: 'true',isBlocked:'false' }, { new: true });
    if (hospital && !isBlocked && !isAccpeted) {
        res.status(200).json({message:"This hospital has Been accepted", hospital});
    }
    else if(isBlocked){
      res.status(200).json({message:"This Hospital has Been UnBlocked", hospital});
    }
    else {
        res.status(401).json({message:"Invalid hospital"});
    }
});
//block hospital
exports.blockhospitals = catchAsyncErrors(async(req, res)=>{
  const {HospitalID} = req.params;
  const hospital = await hospitalModel.findByIdAndUpdate(HospitalID, { isBlocked:'true' }, { new: true });
  if (hospital) {
    res.status(200).json({message:"This hospital has Been Blocked", hospital});
  }
  else {
    res.status(401).json({message:"Invalid hospital ID"});
  }
})
//generate bar Chart for users count
exports.generateUserCountChart = async (req, res) => {
   // Fetch user counts from the database
   const parentCount = await parentModel.countDocuments();
   const hospitalCount = await hospitalModel.countDocuments();
   const doctorCount = await doctorModel.countDocuments();
   const childCount = await childModel.countDocuments();

   // Configure the chart data
   const chartData = {
    labels: [`Parents (${parentCount})`, `Hospitals (${hospitalCount})`, `Doctors (${doctorCount})`, `Children (${childCount})`],
     datasets: [
       {
         label: 'User Count',
         backgroundColor: ['blue', 'green', 'red', 'orange'],
         data: [parentCount, hospitalCount, doctorCount, childCount],
       },
     ],
   };

   // Configure the chart options
   const chartOptions = {
     responsive: true,
     plugins: {
       legend: {
         position: 'bottom',
         labels: {
           boxWidth: 12,
           font: {
             size: 12,
           },
         },
       },
     },
   };

   // Create an instance of ChartJSNodeCanvas
   const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 400, height: 300 });

   // Generate the chart image
   const configuration = {
     type: 'pie',
     data: chartData,
     options: chartOptions,
   };
   const chartImage = await chartJSNodeCanvas.renderToDataURL(configuration);

   // Return the chart image in the response
   res.status(200).json({ chartImage });
}