const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Express!!"));
const email = process.env.EMAIL || "";
const mailAppPassword = process.env.APP_PASSWORD || "";

console.log(email, mailAppPassword, "1mnen");

app.post("/send-email", async (req, res) => {
  const { email, text, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: mailAppPassword,
    },
  });
  console.log(transporter);
  try {
    const data = await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject,
      text,
      headers: {
        "X-Priority": "1", // 高い優先度を設定
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
    });

    return res.status(200).send("Email sent successfully");
  } catch (error) {
    return res.status(500).send("Failed to send email");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
module.exports = app;
