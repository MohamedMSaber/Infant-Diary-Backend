const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const announcementModel = require("./announcement.model");


/// Add Announcement by the admin
exports.addAnnouncement = catchAsyncErrors(async (req, res) => {
    const {title,body}= req.body;
    let announcement = new announcementModel(req.body);
    await announcement.save();
    res.status(200).json({announcement,message:"You have been added Announcement Successfully..."});
});

exports.getAnnouncements = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(announcementModel.find(), req.query).paginate().fields().filter().sort()
  Products = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, Products });
});
/// Update Announcement
exports.updateAnnouncement = updateFun(announcementModel);
/// Delete Announcement
exports.deleteAnnouncement = deleteFun(announcementModel);
/// Get All Announcements
//exports.getAnnouncements = getAllFun(announcementModel);
/// Get Specific Announcement
exports.getAnnouncementByID = getSpecficFun(announcementModel);


