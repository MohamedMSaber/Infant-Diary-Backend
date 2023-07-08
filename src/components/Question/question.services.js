const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, getSpecficFun, deleteFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const questionModel = require("./question.model");

// Add Question
exports.addFAQ = catchAsyncErrors(async (req, res) => {
    const question = new questionModel(req.body);
    await question.save();
    res.status(200).json({question,message:"You have been added Question Successfully..."});
});
//get All questions
//get All questions
exports.getQuestions = catchAsyncErrors(async (req, res) => {
  const { keyword } = req.query;

  let apiFeatures = new ApiFeatures(questionModel.find(), req.query).paginate().fields().sort();
  if (keyword) {
    const parsedAge = parseInt(keyword);
    if (isNaN(parsedAge)) {
      apiFeatures.mongooseQuery.find({
        $or: [
          { body: { $regex: keyword, $options: 'i' } },
          { answer: { $regex: keyword, $options: 'i' } },
          { questionHeading: { $regex: keyword, $options: 'i' } }
        ]
      });
    } else {
      apiFeatures.mongooseQuery.find({
        $or: [
          { age: parsedAge },
          { body: { $regex: keyword, $options: 'i' } },
          { answer: { $regex: keyword, $options: 'i' } },
          { questionHeading: { $regex: keyword, $options: 'i' } }
        ]
      });
    }
  }

  const questions = await apiFeatures.mongooseQuery;
  res.status(200).json({ page: apiFeatures.page, questions });
});

// Update Question
exports.updateFAQ = updateFun(questionModel);
// Get Specific Question
exports.getQuestion = getSpecficFun(questionModel)
// Delete Question
exports.deleteQuestion = deleteFun(questionModel)