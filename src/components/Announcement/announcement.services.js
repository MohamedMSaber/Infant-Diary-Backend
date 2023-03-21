const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const announcementModel = require("./announcement.model");


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
exports.getAnnouncementByID = getSpecficFun(announcementModel);


