const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
 
  host: 'smtp.ipage.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER, // your domain email address
    pass: process.env.PASSWORD // your password
  }


  });


  
module.exports = {
    
    sendConfirmationEmail: (name, email, confirmationCode) => {

    transport.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h3>Hello ${name}</h3>
          <p>Thank you for Registering. Please confirm your email by clicking on the following link</p>
          <a href=${process.env.APP_URL + "confirm/" + confirmationCode}> Click here</a>
          <p>The link will be expired within 10 minutes</p>
          </div>`,
    }).catch(err => console.log(err));
 

}


}