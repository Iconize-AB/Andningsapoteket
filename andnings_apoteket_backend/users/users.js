const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('@prisma/client').PrismaClient();
const twilio = require('twilio');
require('dotenv').config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const router = express.Router();

// Step 1: Send verification code during sign-in
router.post("/signin", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber }, 
    });

    if (!user) return res.status(404).json({ error: "User not found." });

    // Generate a random 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the code in the database temporarily (expires after a while)
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationCode },
    });

    // Send the code to the user's phone via SMS
    await twilioClient.messages.create({
      body: `Your login code is: ${verificationCode}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    res.status(200).json({ message: "Verification code sent." });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: "Failed to send verification code." });
  }
});

// Step 2: Verify the code entered by the user
router.post("/verify-code", async (req, res) => {
  const { phoneNumber, verificationCode } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });

    if (!user) return res.status(404).json({ error: "User not found." });

    // Compare the entered code with the stored code
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ error: "Invalid verification code." });
    }

    // Clear the verification code after successful login
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationCode: null },
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
  const { name, phoneNumber, password } = req.body;

  try {
    // Check if the phone number already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber }, // Assuming phoneNumber field exists in your DB
    });

    // If the user already exists, return an error to prevent duplicate registrations
    if (existingUser) {
      return res.status(400).json({ error: 'Phone number already exists.' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        phoneNumber,
        password: hashedPassword,
        isActivated: false,
        emailNotification: true,
        pushNotification: true,
        viewedAnalyticsIntroduction: false,
        subscriptionType: "freemium",
        viewedRecoveryIntroduction: false,
        viewedWorkInIntroduction: false,
        viewedWorkoutIntroduction: false,
        viewedWelcomePopup: false,
        viewedNutritionIntroduction: false,
        viewedReceipeListIntroduction: false,
      },
    });

    const token = jwt.sign({ userId: user.id }, 'secret', {
      expiresIn: '180d',
    });

    // Generate a random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Update the user with the verification code
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationCode },
    });

    // Send the verification code via SMS using Twilio
    await twilioClient.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    // Respond to the client with success and the token
    res.status(200).json({ message: 'Verification code sent via SMS.', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'User could not be created.' });
  }
});

module.exports = router;
