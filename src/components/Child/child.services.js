const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const childModel = require("./child.model");

exports.addChild = catchAsyncErrors(async (req, res) => {
    const {name,birthDate,gender,weight,headDiameter,height}= req.body;
    let child = new childModel(req.body);
    await child.save();
    res.status(200).json({child,message:"You have been added your child Successfully..."});
  });

/// update baby
exports.updateChild = updateFun(childModel);
/// Delete baby
exports.deleteChild = deleteFun(childModel);
/// Get All babies
exports.getChildren = getAllFun(childModel);
/// Get Specific baby
exports.getChild = getSpecficFun(childModel);