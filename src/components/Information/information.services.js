const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const informationModel = require("./information.model");



/// Create information
exports.createInformation = catchAsyncErrors(async (req, res) => {
    const {topic,body,type,age,link,videoLink}= req.body;
    let information = new informationModel (req.body);
    await information.save();
    res.status(200).json({information,message:"You have been created information Successfully..."});
});

exports.getInformations = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(informationModel.find(), req.query).paginate().fields().filter().sort()
  Products = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, Products });
});

/// update information
exports.updateInformation = updateFun(informationModel);
/// Delete information
  exports.deleteInformation = deleteFun(informationModel);
/// Get All informations
//exports.getInformations = getAllFun(informationModel);
/// Get Specific information
  exports.getInformation = getSpecficFun(informationModel);