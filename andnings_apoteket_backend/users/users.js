const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const verifyAppleToken = require('../authentication/verifyApple');


const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) return res.status(404).json({ error: "User not found." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid password." });

    const token = jwt.sign({ userId: user.id }, "secret", {
      expiresIn: "180d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed." });
  }
});

router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  console.log('email', email, code);

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    console.log('user', user);

    if (!user) return res.status(404).json({ error: "User not found." });

    // Compare the entered code with the stored code
    if (user.verificationCode !== code) {
      return res.status(400).json({ error: "Invalid verification code." });
    }

    // Clear the verification code after successful login
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationCode: null, active: true },
    });

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user.id }, "secret", {
      expiresIn: "180d",
    });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: "Verification failed." });
  }
});

router.post('/register', async (req, res) => {
  const { email, password, appleIdToken } = req.body;

  try {
    let emailFromApple;

    if (appleIdToken) {
      const applePayload = await verifyAppleToken(appleIdToken);
      console.log('applePayload', applePayload);
      if (!applePayload || !applePayload.email) {
        return res.status(400).json({ error: 'Invalid Apple ID token.' });
      }
      emailFromApple = applePayload.email;
    }

    const userEmail = appleIdToken ? emailFromApple : email;

    console.log('appleIdToken', appleIdToken);

    // Check if the email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    // If not Apple sign-in, hash the password before storing it in the database
    let hashedPassword = null;
    if (!appleIdToken && password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email: userEmail,
        password: hashedPassword, // Will be null for Apple Sign-In users
        active: false,
        subscriptionType: "freemium",
        profile: {
          create: {
            pushNotifications: true,
            emailNotifications: true,
            acceptedTermsAndConditions: false,
            ratingFunction: false,
          },
        },
      },
      include: {
        profile: true, // Include profile data in the user object
      },
    });

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '180d' });

    // Generate a random verification code (6-digit)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Update the user with the verification code
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationCode },
    });

    // Send the verification code via email using SendGrid
    const msg = {
      to: userEmail,
      from: 'support@iconize-earth.com',
      subject: 'Verify your email for Andningsapoteket',
      text: `Your verification code is: ${verificationCode}`,
      html: `<strong>Your verification code is: ${verificationCode}</strong>`,
    };

    await sgMail.send(msg);

    return res.status(200).json({ message: 'Verification email sent.', token });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'User could not be created.' });
  }
});


module.exports = router;
