const authRouter = require("./components/User/Auth/auth.api")
const parentRouter = require("./components/User/Parent/parent.api")
const adminRouter = require("./components/User/Admin/admin.api")

const announcementRouter = require("./components/Announcement/announcement.api")

const questionRouter = require("./components/Question/question.api")





module.exports={
    authRouter,
    parentRouter,
    adminRouter,
    announcementRouter,
    questionRouter
}