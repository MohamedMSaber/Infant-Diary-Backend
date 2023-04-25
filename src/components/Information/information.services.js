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

  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ topic: { $regex: word, $options: 'i' } }, { body: { $regex: word, $options: 'i' } },{ type: { $regex: word, $options: 'i' } },{ link: { $regex: word, $options: 'i' } },{ videoLink: { $regex: word, $options: 'i' } }] })
  }
  info = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, info });
});

/// update information
exports.updateInformation = updateFun(informationModel);
/// Delete information
  exports.deleteInformation = deleteFun(informationModel);
/// Get All informations
//exports.getInformations = getAllFun(informationModel);
/// Get Specific information
  exports.getInformation = getSpecficFun(informationModel);