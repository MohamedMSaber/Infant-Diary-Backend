
const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, getAllFun, getSpecficFun, deleteFun } = require("../Handlers/handler.factory");
const questionModel = require("./question.model");

/// Add Question
exports.addFAQ = catchAsyncErrors(async (req, res) => {
    const {body,answer,age,virusName}= req.body;
    let question = new questionModel(req.body);
    await question.save();
    res.status(200).json({question,message:"You have been added Question Successfully..."});
});

/// Update Question
exports.updateFAQ = updateFun(questionModel);
/// Get All Questions
exports.getQuestions = getAllFun(questionModel);
/// Get Specific Question
exports.getQuestion = getSpecficFun(questionModel)
/// Delete Question
exports.deleteQuestion = deleteFun(questionModel)