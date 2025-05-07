const { EMAIL,PASSWORD}=require("../../config/env.config")
const nodemailer=require("nodemailer")
const smtpServer = async (toEmail, otp) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
  
    // Email details
    const mailOptions = {
      from: process.env.EMAIL,
      to: toEmail,
      subject: "OTP Verification - socialMedia",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">OTP Verification</h2>
          <p>Dear User,</p>
          <p>Your OTP to verify your account is:</p>
          <p style="font-size: 1.5em; color: #007bff; font-weight: bold;">${otp}</p>
          <p>Please enter this code to complete your verification process. This code is valid for the next 60 seconds.</p>
          <p>If you did not request this, please ignore this email.</p>
          <hr>
          <p style="font-size: 0.9em; color: #888;">This is an automated message, please do not reply.</p>
        </div>
      `,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      transporter.close();
      return true;
    } catch (error) {
      return false;
    }
  };
  
  module.exports={
    smtpServer
  }