const { catchAsyncErrors } = require("../../../utils/catchAsync");
const announcementModel = require("../../Announcement/announcement.model");
const { deleteFun, updateFun, getAllFun, getSpecficFun } = require("../../Handlers/handler.factory");
const questionModel = require("../../Question/question.model");


/// Add Announcement
exports.addAnnouncement = catchAsyncErrors(async (req, res) => {
    const {title,body}= req.body;
    let announcement = new announcementModel(req.body);
    await announcement.save();
    res.status(200).json({announcement,message:"You have been added Announcement Successfully..."});
});
/// Update Announcement
  exports.updateAnnouncement = updateFun(announcementModel);
/// Delete Announcement
  exports.deleteAnnouncement = deleteFun(announcementModel);
/// Get All Announcements
  exports.getAnnouncements = getAllFun(announcementModel);
/// Get Specific Announcement
  exports.getAnnouncement = getSpecficFun(announcementModel);

  
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