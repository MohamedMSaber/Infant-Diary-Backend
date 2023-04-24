const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const serviceModel = require("./service.model");



/// Create Service
exports.createSercice = catchAsyncErrors(async (req, res) => {
    const {name,age}= req.body;
    let service = new serviceModel (req.body);
    await service.save();
    res.status(200).json({service,message:"You have been created service Successfully..."});
});

exports.getServices = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(serviceModel.find(), req.query).paginate().fields().filter().sort()
  Products = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, Products });
});

/// Edit service
exports.updateService = updateFun(serviceModel);
/// Delete service
  exports.deleteService = deleteFun(serviceModel);
/// Get All services
//exports.getServices = getAllFun(serviceModel);
/// Get Specific service
  exports.getService = getSpecficFun(serviceModel);
