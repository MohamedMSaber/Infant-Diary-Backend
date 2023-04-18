const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const informationModel = require("./information.model");



/// Create information
exports.createInformation = catchAsyncErrors(async (req, res) => {
    const {topic,body,type,age,link,videoLink}= req.body;
    let information = new informationModel (req.body);
    await information.save();
    res.status(200).json({information,message:"You have been created information Successfully..."});
});

/// update information
exports.updateInformation = updateFun(informationModel);
/// Delete information
  exports.deleteInformation = deleteFun(informationModel);
/// Get All informations
  exports.getInformations = getAllFun(informationModel);
/// Get Specific information
  exports.getInformation = getSpecficFun(informationModel);