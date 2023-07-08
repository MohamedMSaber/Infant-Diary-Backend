const ApiFeatures = require("../../../utils/ApiFeatures");
const { catchAsyncErrors } = require("../../../utils/catchAsync");
const doctorModel = require('../Doctor/doctor.model');
const clinicModel = require('../../Clinic/clinic.model');
const cloudinary = require("../../../utils/cloudinary");


// get ALL Doctor with his clinics for user
exports.getDoctors = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(doctorModel.find({isAccpeted: true ,isBlocked: false}), req.query).fields().filter().sort()
  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ name: { $regex: word, $options: 'i' } }, { specialization: { $regex: word, $options: 'i' } }] }).select('-ratings');
  }
  let doctors = await apiFeatures.mongooseQuery;
  res.status(200).json({ page: apiFeatures.page, doctors });
});
//get Specific Doctor for user
exports.getDoctor = catchAsyncErrors(async (req, res) => {
  const { doctorID } = req.params;
  const doctor = await doctorModel.findById(doctorID).select('-ratings');
  if (doctor) {
    res.status(200).json({ doctor });
  } else {
    res.status(404).json({ message: "Doctor ID not found" });
  }
});
//get doctor information for doctor
exports.getDoctorInfo = catchAsyncErrors(async (req, res) => {
  const doctorID = req.user._id;
  const doctor = await doctorModel.findOne(doctorID);
  res.status(200).json(doctor);
});
//update doctor profile
exports.updateDoctorProfile = catchAsyncErrors(async (req, res) => {
  const doctorID = req.user._id;
  const doctor = await doctorModel.findById(doctorID);
  if (doctor) {
    const newDoctor = await doctorModel.findByIdAndUpdate(doctorID, req.body, { new: true });
    res.status(200).json({ newDoctor, message: "your profile has been updated" });
  } else {
    res.status(404).json({ message: "can not update your profile" })
  }
});
//Delete Docotor profile
exports.deleteDocotorProfile = catchAsyncErrors(async (req, res) => {
  const  doctorID  = req.params.doctorID || req.user._id; 
  const doctor = await doctorModel.findById(doctorID);
  if (doctor) {
    if (doctor.nationalIdPhoto) {
      const public_id = doctor.nationalIdPhoto.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`DoctorsNationalIDs/${public_id}`);
    }
    let document = await doctorModel.findByIdAndDelete(doctorID);
    await clinicModel.deleteMany({doctorID: doctorID})
    if (!document) {
      return next(new AppError(`doctor Not Found To delete`, 404));
    }
    res.status(200).json({ message: `this doctor has Been deleted`  , document});
  }
});
//Rating Doctor 
exports.ratingDoctor = catchAsyncErrors(async (req, res) => {
  const { doctorID } = req.params;
  const { rating } = req.body;
  const user = req.user._id;

  // Check if the rating is within the valid range
  if (rating < 0 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 0 and 5" });
  }
    // Find the doctor by ID
    const doctor = await doctorModel.findById(doctorID);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create a new rating object
    const newRating = {
      rating,
      user,
      date: new Date()
    };

    // Add the new rating to the doctor's ratings array
    doctor.ratings.push(newRating);
    // Save the updated doctor document
    await doctor.save();
    // Calculate the updated average rating
    const ratingsCount = doctor.ratings.length; //1
    const ratingsSum = doctor.ratings.reduce((sum, r) => sum + r.rating, 0); //5
    const ratingAverage = ratingsSum / ratingsCount; //5
    // Get the maximum and minimum ratings
    const doctorRatings = doctor.ratings.map(r => r.rating);
    const maxRating = Math.max(...doctorRatings);//5
    const minRating = Math.min(...doctorRatings);//5
    const ratings = ((ratingAverage - minRating) / (maxRating - minRating))*(5);
    // Update the doctor's ratingAverage field with the normalized value
    if ((ratingAverage == minRating) || (maxRating == minRating)) {
        doctor.ratingAverage = minRating;
    } else {
        doctor.ratingAverage = ratings;
    }
    await doctor.save();
    res.status(200).json({ message: "Rating saved successfully" });
});
