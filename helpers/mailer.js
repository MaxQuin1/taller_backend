const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "maximoquinteroescobar8@gmail.com",
      pass: "kscs ouvf ofyl nppc",
    },
});

module.exports = transporter;
