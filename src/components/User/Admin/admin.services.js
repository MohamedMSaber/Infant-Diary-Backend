const { catchAsyncErrors } = require("../../../utils/catchAsync");
const doctorModel = require("../Doctor/doctor.model");
const hospitalModel = require("../Hospital/hospital.model");
const parentModel = require("../Parent/parent.model");
const chidModel = require("../../Child/child.model");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const childModel = require("../../Child/child.model");

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