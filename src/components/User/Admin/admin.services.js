const { catchAsyncErrors } = require("../../../utils/catchAsync");
const announcementModel = require("../../Announcement/announcement.model");
const questionModel = require("../../Question/question.model");



exports.addAnnouncement = catchAsyncErrors(async (req, res) => {
    const {title,body}= req.body;
    let announcement = new announcementModel(req.body);
    await announcement.save();
    res.status(200).json({announcement,message:"You have been added Announcement Successfully..."});
  });

  exports.addFAQ = catchAsyncErrors(async (req, res) => {
    const {body,answer,age,virusName}= req.body;
    let question = new questionModel(req.body);
    await question.save();
    res.status(200).json({question,message:"You have been added Question Successfully..."});
  });