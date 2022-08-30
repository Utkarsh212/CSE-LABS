const nodemailer = require('nodemailer');

module.exports = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject,
            html
        })
        return 'Email Sent Successfully...'
    } catch (err) {
        return err.message;
    }
}