const { catchAsyncErrors } = require("../../utils/catchAsync");
const { updateFun, deleteFun, getAllFun, getSpecficFun } = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures")
const announcementModel = require("./announcement.model");
const parentModel = require("../User/Parent/parent.model");
const hospitalModel = require("../User/Hospital/hospital.model");
const doctorModel = require("../User/Doctor/doctor.model");
const sendEmail = require("../../utils/sendEmail");


// Add Announcement by the admin
exports.addAnnouncement = catchAsyncErrors(async (req, res) => {
  let announcement = new announcementModel(req.body);
  await announcement.save();
  const parents = await parentModel.find();
  const hospitals = await hospitalModel.find();
  const doctors = await doctorModel.find();
  const subject = `NEW Announcement from Infant Diary`;   
  const htmlBody = `<h1>Dear {recipientName},\nThere is new Announcemnt.\nCheck It Please😊\nBest regards,\nThe Infant Diary Team</h1>`;
  const sendEmailPromises = [];
  if(announcement){
 // Loop through parents and send email
 for (const parent of parents) {
  const emailBody = htmlBody.replace('{recipientName}', parent.name)
  const emailPromise = sendEmail(parent.email, emailBody, subject);
  sendEmailPromises.push(emailPromise);
}

// Loop through hospitals and send email
for (const hospital of hospitals) {
  const emailBody = htmlBody.replace('{recipientName}', hospital.name);
  const emailPromise = sendEmail(hospital.email, emailBody, subject);
  sendEmailPromises.push(emailPromise);
}

// Loop through doctors and send email
for (const doctor of doctors) {
  const emailBody = htmlBody.replace('{recipientName}', doctor.name) 
  const emailPromise = sendEmail(doctor.email, emailBody, subject);
  sendEmailPromises.push(emailPromise);
}

await Promise.all(sendEmailPromises);
res.status(200).json({announcement,message:"You have been added Announcement Successfully..."});
  }
 
});

exports.getAnnouncements = catchAsyncErrors(async (req, res) => {
  let apiFeatures = new ApiFeatures(announcementModel.find(), req.query).paginate()
 
  if (req.query.keyword) {
    let word = req.query.keyword
    apiFeatures.mongooseQuery.find({ $or: [{ body: { $regex: word, $options: 'i' } }, { title: { $regex: word, $options: 'i' } }] })
  }

  // Sort by ascending createdAt
  apiFeatures.mongooseQuery.sort({ createdAt: -1 });
  announcements = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, announcements });
});

// Update Announcement
exports.updateAnnouncement = updateFun(announcementModel);
// Delete Announcement
exports.deleteAnnouncement = deleteFun(announcementModel);
// Get Specific Announcement
exports.getAnnouncementByID = getSpecficFun(announcementModel);


