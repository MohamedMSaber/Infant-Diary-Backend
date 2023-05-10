const authRouter = require("./components/User/Auth/auth.api")
const parentRouter = require("./components/User/Parent/parent.api")
const adminRouter = require("./components/User/Admin/admin.api")
const announcementRouter = require("./components/Announcement/announcement.api")
const questionRouter = require("./components/Question/question.api")
const postRouter = require("./components/Post/post.api")
const commentRouter = require("./components/Comment/comment.api")
const clinicRouter = require("./components/Clinic/clinic.api")
const hospitalRouter = require("./components/Hospital/hospital.api")
const informationRouter = require("./components/Information/information.api")
const serviceRouter = require("./components/Service/service.api")
const standardRouter = require("./components/Standard/standard.api")
const vaccineRouter = require("./components/Vaccine/vaccine.api")
const childRouter = require("./components/Child/child.api")




module.exports={
    authRouter,
    childRouter,
    parentRouter,
    adminRouter,
    announcementRouter,
    questionRouter,
    postRouter,
    commentRouter,
    clinicRouter,
    hospitalRouter,
    informationRouter,
    serviceRouter,
    standardRouter,
    vaccineRouter
    
}