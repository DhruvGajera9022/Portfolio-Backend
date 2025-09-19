const nodemailer = require("nodemailer");
const logger = require("./logger.util");

/**
 * Configure Nodemailer transporter
 * Uses environment variables for credentials
 */
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send an email
 *
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Portfolio App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        logger.info(`Email sent: ${info.messageId} to ${to}`);
    } catch (error) {
        logger.error(`Error sending email to ${to}: ${error.message}`);
        throw new Error("Email could not be sent");
    }
};

/**
 * Send password reset email
 *
 * @param {string} to - Recipient email address
 * @param {string} token - Password reset token
 * @returns {Promise<void>}
 */
const sendResetEmail = async (to, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const html = `
    <p>You requested a password reset.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>If you did not request this, please ignore this email.</p>
  `;
    await sendEmail(to, "Password Reset Request", html);
};

module.exports = {
    sendEmail,
    sendResetEmail,
};
