const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:8081',
  'https://g3t-lit.web.app',
  'https://g3t-lit.firebaseapp.com',
];
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : defaultOrigins;

const normalizeOrigin = (origin) => (origin ? origin.replace(/\/+$/, '') : origin);

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = normalizeOrigin(origin);
      const normalizedAllowList = corsOrigins.map(normalizeOrigin);
      if (!normalizedOrigin || normalizedAllowList.includes(normalizedOrigin) || normalizedAllowList.includes('*')) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);
app.options('*', cors());
app.use(express.json({ limit: '1mb' }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/bookings', async (req, res) => {
  const { name, email, notes, date, time } = req.body || {};

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(date) || !isNonEmptyString(time)) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const toEmail = process.env.TO_EMAIL || 'getlitgotlit@gmail.com';
  const cleanedNotes = isNonEmptyString(notes) ? notes.trim() : 'N/A';

  try {
    await transporter.sendMail({
      from: `Booking Form <${process.env.GMAIL_USER}>`,
      to: toEmail,
      replyTo: email.trim(),
      subject: `New booking from ${name.trim()} - ${date.trim()} ${time.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Date: ${date.trim()}`,
        `Time: ${time.trim()}`,
        `Notes: ${cleanedNotes}`,
      ].join('\n'),
    });

    return res.json({ status: 'sent' });
  } catch (error) {
    console.error('Failed to send booking email', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Booking backend listening on port ${port}`);
});
