const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const router = express.Router();

const TechnicianEmail = require("../models/EquipmentManagement_technicianEmail");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'imashanirmani20@gmail.com',
    pass: 'pgoi jmbj cwus bjhk'
  }
});

const Email = TechnicianEmail;

router.post('/t', cors(), async (req, res) => {
  const { to, subject, description } = req.body;

  if (!to || !subject || !description) {
    return res.status(400).json({
      status: false,
      respMesg: 'Missing required fields'
    });
  }

  const mailOptions = {
    from: 'imashanirmani20@gmail.com',
    to,
    subject,
    text: description,
    html: `
      <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Email: ${to}</li>
          <li>Subject: ${subject}</li>
          <li>Message: ${description}</li>
        </ul>
      </div>
    `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(result);

    const email = new Email({
      to,
      subject,
      description
    });

    const savedEmail = await email.save();
    console.log(savedEmail);

    res.json({
      status: true,
      respMesg: 'Email sent successfully',
      email: savedEmail
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: false,
      respMesg: 'Error sending email'
    });
  }
});

module.exports = router;
