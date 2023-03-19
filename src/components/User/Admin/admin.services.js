const { catchAsyncErrors } = require("../../../utils/catchAsync");
const announcementModel = require("../../Announcement/announcement.model");



exports.addAnnouncement = catchAsyncErrors(async (req, res) => {
    const {title,body}= req.body;
    let announcement = new announcementModel(req.body);
    await announcement.save();
    res.status(200).json({announcement,message:"You have been added Announcement Successfully..."});
  });