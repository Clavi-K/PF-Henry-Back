/* ===== REQUIRED IMPORTS ===== */

const nodemailer = require("nodemailer")
const config = require("../config")

/* ========== */

/* ===== MAIL SENDER CLASS ===== */

class MailSender {

    constructor() {

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: config.notifications.GMAIL,
                pass: config.notifications.PWD
            }
        })

    }

    async send(email, subject, template) {

        const mailOptions = {
            from: "Notifications <no-reply>",
            subject,
            to: email,
            html: template
        }

        await this.transporter.sendMail(mailOptions)

    }

}

module.exports = new MailSender()

/* ========== */