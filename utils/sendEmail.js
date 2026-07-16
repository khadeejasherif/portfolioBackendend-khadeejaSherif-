const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (contact) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // send notification to yourself
        subject: "New Contact Form Submission",
        html: `
            <h2>New Contact Message</h2>

            <p><strong>First Name:</strong> ${contact.first_name}</p>
            <p><strong>Last Name:</strong> ${contact.last_name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone_number}</p>

            <h3>Message</h3>
            <p>${contact.message}</p>
        `
    });
};

module.exports = sendEmail;