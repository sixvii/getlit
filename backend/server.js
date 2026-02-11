const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const corsOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: corsOrigin ? corsOrigin.split(',') : '*',
  })
);
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/bookings', async (req, res) => {
  const { name, email, notes, date, time, timeZone } = req.body || {};

  if (!name || !email || !date || !time || !timeZone) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, date, time, timeZone',
    });
  }

  const recipient = process.env.TO_EMAIL || 'getlitgotlit@gmail.com';
  const subject = `New booking request from ${name}`;

  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Time zone: ${timeZone}`,
    `Notes: ${notes || '-'}`,
  ].join('\n');

  const htmlBody = `
    <h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Time zone:</strong> ${timeZone}</p>
    <p><strong>Notes:</strong> ${notes || '-'}</p>
  `;

  try {
    await transporter.sendMail({
      from: `Booking Request <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).send('Failed to send email');
  }
});

app.listen(port, () => {
  console.log(`Booking API listening on port ${port}`);
});
