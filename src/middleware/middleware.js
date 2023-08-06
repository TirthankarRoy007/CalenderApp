   const nodemailer = require('nodemailer')
   
   exports.sendEmail = async (options) =>{

    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        }
      });
    
     
    const mailOption ={
        from:"Tirthankar Roy",
        to: options.emailAddress,
        subject: options.subject,
        text: options.text
    }
    
    
    await transporter.sendMail(mailOption)
    }