/* ===== REQUIRED IMPORTS ===== */
const path = require("path");
const nodemailer = require("nodemailer");
const config = require("../config");
const hbs = require("nodemailer-express-handlebars");

/* ========== */

/* ===== MAIL SENDER CLASS ===== */

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: config.notifications.GMAIL,
        pass: config.notifications.PWD,
      },
    });
  }

  async send(email, subject, template) {
    const mailOptions = {
      from: "Notifications <no-reply>",
      subject,
      to: email,
      html: template,
    };

    await this.transporter.sendMail(mailOptions);
  }
  async payment(email, subject) {
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./notifications/views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./notifications/views"),
      extName: ".handlebars",
    };

    const mailOptions = {
      from: "Notifications <no-reply>",
      subject,
      to: email,
      template: "payment",
      attachments: [
        {
          filename: "image-1.jpeg",
          path: "./views/images/image-1.jpeg",
          cid: "image-1",
        },
      ],
    };
    this.transporter.use("compile", hbs(handlebarOptions));
    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new MailSender();

/* ========== */
