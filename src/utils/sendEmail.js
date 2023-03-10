const nodemailer = require("nodemailer");

const sendEmail = async (email , htmlBody)=>{
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            service:"gmail",
            auth: {
                user: process.env.SENDER_EMAIL, // generated ethereal user
                pass: process.env.SENDER_kEY, // generated ethereal password
            },
        });
 
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: htmlBody, // html body
        });
    }


module.exports = sendEmail;
