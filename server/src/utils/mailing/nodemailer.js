import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user: "bot474827@gmail.com", 
    pass: process.env.APP_PASSWORD,
  },
});

export const sender = {
  email: "bot474827@gmail.com",
  name: "test bot",
}

export default transporter;
