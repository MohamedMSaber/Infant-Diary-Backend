
const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, getAllFun, getSpecficFun, deleteFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const questionModel = require("./question.model");

/// Add Question
exports.addFAQ = catchAsyncErrors(async (req, res) => {
    const {body,answer,age,virusName}= req.body;
    let question = new questionModel(req.body);
    await question.save();
    res.status(200).json({question,message:"You have been added Question Successfully..."});
});

exports.getQuestions = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(questionModel.find(), req.query).paginate().fields().filter().sort()

  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ body: { $regex: word, $options: 'i' } }, { answer: { $regex: word, $options: 'i' } },{ virusName: { $regex: word, $options: 'i' } }] })
  }
  questions = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, questions });
});
/// Update Question
exports.updateFAQ = updateFun(questionModel);
/// Get All Questions
//exports.getQuestions = getAllFun(questionModel);
/// Get Specific Question
exports.getQuestion = getSpecficFun(questionModel)
/// Delete Question
exports.deleteQuestion = deleteFun(questionModel)