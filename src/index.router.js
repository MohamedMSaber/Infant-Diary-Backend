const authRouter = require("./components/User/Auth/auth.api")
const parentRouter = require("./components/User/Parent/parent.api")
const adminRouter = require("./components/User/Admin/admin.api")




module.exports={
    authRouter,
    parentRouter,
    adminRouter
}