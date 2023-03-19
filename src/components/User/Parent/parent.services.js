// const jwt= require("jsonwebtoken")
// const bcrypt= require("bcryptjs")

const { catchAsyncErrors } = require("../../../utils/catchAsync");
const childModel = require("../../Child/child.model");

// const { sendEmail } = require("../../utils/email");
// const ParentModel = require("./parent.model");

// exports.signup = async (req,res)=>{
//     try {
//         const { name, email, password,phone ,age,gender,address} = req.body/*not ordered because it deals with key , value*/ 
//         // here there is no need to check that email found or not because we save it as a uniqe
//         let newUser = new ParentModel({ name, email, password,phone ,age,gender,address});
//         let savedUser = await newUser.save()
//        // console.log("heyyyyyyyyyyyyyyy");
//        const token = jwt.sign({id:savedUser._id}, process.env.emailToken,{expiresIn:5*60})
//         const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
//         const link2=`${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${savedUser._id}`
//         const message = `<a href='${link}'>plz follow me to confirm your account </a>
//         <br>
//         <a href='${link2}'>re-send confirmationEmail </a>
//         `
//         sendEmail(savedUser.email , message);
//          res.status(201).json({ message: "Done", savedUser })
//     } catch (error) {
//         console.log(error.keyValue);
//         if (error.keyValue?.email) {
//                 res.json({ message: "email exist" })
//         } else {
//             res.status(500).json({ message: "catch error", error })
//         }
//     }
// }
// exports.refreshEmail = async (req,res)=>{
//     try {
//       const  id= req.params.id;
//       const user= await ParentModel.findById(id).select('emailConfirm email')
//       if (!user) {
//           res.status(404).json({message:"invalid account"})
//       } else {
//           if (user.emailConfirm) {
//               res.status(400).json({message:"already confirmed"})
//           } else {
//               const token = jwt.sign({id:user._id}, process.env.emailToken,{expiresIn:5*60})
//               const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
              
//               const link2=`${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${user._id}`
//               const message = `<a href='${link}'>plz follow me to confirm u account </a>
//               <br>
//               <a href='${link2}'>re-send confirmationEmail </a>
//               `
//               sendEmail(user.email,message)
              
//               res.status(200).json({message:"Done, check u email "})
//           }
//       }
//     } catch (error) {
//       res.status(500).json({ message: "catch error", error })
//     }
  
//   }

//   exports.confirmEmail = async (req,res)=>{
//     try {
//       const {token}= req.params;
//       const decoded = jwt.verify(token,process.env.emailToken)
//       if (!decoded) {
//           res.status(400).json({message:"invalid token user"})
//       } else {
//           const user = await ParentModel.findById(decoded.id).select('emailConfirm');
//           if (!user) {
//               res.status(404).json({message:"invalid token id"})
//           } else {
//               if (user.emailConfirm) {
//                   res.status(400).json({message:"you already confimed your email plz proceed to login page"})
//               } else {
//                  const user= await ParentModel.findByIdAndUpdate({_id:user._id},{emailConfirm:true},{new:true})
//                   res.status(200).json({message:"Done plz proceed to login page"})
//               }
              
//           }
//       }
//     } catch (error) {
//       res.status(500).json({message:"catch error",error})
//     }
//   }

//  exports.login = async (req,res)=>{
//     try {
//         const {email,password}= req.body;
//         const user = await ParentModel.findOne({email});
//         if (!user) {
//             res.status(404).json({message:"in-valid account email"})
//         } else {

//         //     if (!user.emailConfirm) {
//         //         res.status(400).json({message:"plz confirm your email first"})
//         //    } 
//         //     else {
//                 const match= await bcrypt.compare(password,user.password) // return true or false
//                 if (!user.isBlocked) {
//                     if (!match) {
//                         res.status(400).json({message:"email pasword mismatch"});
//                     } else {
                        
//                        // const user= await userModel.findByIdAndUpdate({_id:user._id},{online:true},{new:true})
//                         const token= jwt.sign({id:user._id, isLoggedIn:true},process.env.loginToken,{expiresIn:'24h'})
                        
//                         res.status(200).json({message:"logged in successfully",token})
//                     }
//                 } else {
//                     res.status(400).json({message:"your account has been already blocked"});
//                 }
               
//           // }
//         }
//     } catch (error) {
        
//     }
// }


// exports.sendCode = async (req,res)=>{
//     try {
//        const {email}= req.body
//        const user = await ParentModel.findOne({email}); // return object or null
//        if (!user) {
//            res.status(404).json({message:"in-valid email"})
//        } else {
//            const code = Math.floor(Math.random()*(9999-1000+1)+1000);// to generate 4 numbers code
//            await ParentModel.findByIdAndUpdate(user._id,{code})
//            sendEmail(user.email,`<p>use this code to update u password :${code}</p>`)
//            res.status(200).json({message:"Done",code})
//        }
//     } catch (error) {
//        res.status(500).json({message:"catch error",error})
//     }
//    }
   
// exports.forgetPassword = async (req,res)=>{
//      try {
//        const {code,email,newPassword}= req.body
//        const user = await ParentModel.findOne({email}); // return object or null
//        if (!user) {
//            res.status(404).json({message:"in-valid email"})
//        } else {
//            if (user.code != code) {
//                res.status(400).json({message:"in-valid auth code"})
//            } else {
//                const hashedPassword = await bcrypt.hash(newPassword,parseInt(process.env.saltRound));
//                await ParentModel.findByIdAndUpdate({_id:user._id},{password:hashedPassword},{code:" "});
//                res.status(200).json({message:"Done"})
//            }
        
//        }
//      } catch (error) {
//        res.status(500).json({message:"catch error",error})
//      }
//    }

exports.addChild = catchAsyncErrors(async (req, res) => {
    const {name,birthDate,gender,weight,headDiameter,height}= req.body;
    let child = new childModel(req.body);
    await child.save();
    res.status(200).json({child,message:"You have been added your child Successfully..."});
  });
