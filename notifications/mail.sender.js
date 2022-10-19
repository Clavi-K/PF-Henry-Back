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

  async send(email, subject, name) {
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
      template: "welcome",
      context: {
        name: name,
      },
    };
    this.transporter.use("compile", hbs(handlebarOptions));
    await this.transporter.sendMail(mailOptions);
  }
  async payment(
    subject,
    name,
    orderId,
    userId,
    email,
    date,
    payment_type,
    order,
    total,
    image,
    type
  ) {
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
      context: {
        name: name,
        orderId: orderId,
        userId: userId,
        email: email,
        date: date,
        payment_type: payment_type,
        order: order,
        total: total,
        image: image,
        type: type,
      },
    };
    this.transporter.use("compile", hbs(handlebarOptions));
    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new MailSender();

/* ========== */
