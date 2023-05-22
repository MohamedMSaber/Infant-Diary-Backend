const ApiFeatures = require("../../../utils/ApiFeatures");
const { catchAsyncErrors } = require("../../../utils/catchAsync");
const doctorModel = require('../Doctor/doctor.model');




exports.getDoctors = catchAsyncErrors(async (req, res) => {
    let apiFeatures = new ApiFeatures(doctorModel.find(), req.query).paginate().fields().filter().sort()
  
    if (req.query.keyword) {
      let word = req.query.keyword
      apiFeatures.mongooseQuery.find({ $or: [{ name: { $regex: word, $options: 'i' } }, { specialization: { $regex: word, $options: 'i' } }] })
    }
    let doctors = await apiFeatures.mongooseQuery;
    res.status(200).json({ page: apiFeatures.page, doctors});
});