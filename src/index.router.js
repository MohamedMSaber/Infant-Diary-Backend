const authRouter = require("./components/User/Auth/auth.api")
const parentRouter = require("./components/User/Parent/parent.api")
const adminRouter = require("./components/User/Admin/admin.api")
const announcementRouter = require("./components/Announcement/announcement.api")
const questionRouter = require("./components/Question/question.api")
const postRouter = require("./components/Post/post.api")
const commentRouter = require("./components/Comment/comment.api")





module.exports={
    authRouter,
    parentRouter,
    adminRouter,
    announcementRouter,
    questionRouter,
    postRouter,
    commentRouter
}