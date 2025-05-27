import nodemailer from "nodemailer"

export const sendWelcomeEmail = async (to, name) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from:  '"Your Company" <${process.env.EMAIL_USER}>',
            to,
            subject: "Welcome to our platform!",
            html: `<h2>Hi ${name},</h2><p>Thanl you for registring. We're excited to have you on board!</p>`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Email send error", error);
    }
}