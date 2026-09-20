const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpUser = process.env.SMTP_USER || process.env.MAIL_USER || "no-reply@ferilsunu.com";
const smtpPass = process.env.SMTP_PASS || process.env.MAIL_PASS || process.env.PASSWORD;
const smtpHost = process.env.SMTP_HOST || "premium193.web-hosting.com";
const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 465;

const transport = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: true, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

module.exports = {
  sendConfirmationEmail: (name, email, confirmationCode) => {
    const rawAppUrl = process.env.APP_URL || "https://notes.ferilsunu.com";
    const baseUrl = rawAppUrl.endsWith("/") ? rawAppUrl : rawAppUrl + "/";
    const confirmUrl = `${baseUrl}confirm/${confirmationCode}`;

    return transport.sendMail({
      from: `"NoteX" <${smtpUser}>`,
      to: email,
      subject: "Confirm your account",
      html: `<div>
          <h1>Email Confirmation</h1>
          <h3>Hello ${name}</h3>
          <p>Thank you for registering. Please confirm your email by clicking on the following link:</p>
          <p><a href="${confirmUrl}">Click here to confirm your email</a></p>
          <p>Or copy and paste this link in your browser:</p>
          <p><a href="${confirmUrl}">${confirmUrl}</a></p>
          <p>The link will expire within 10 minutes.</p>
        </div>`
    }).catch(err => {
      console.error("Error sending confirmation email:", err);
    });
  }
};
