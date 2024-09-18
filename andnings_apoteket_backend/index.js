const express = require("express");
const { PrismaClient } = require("@prisma/client");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SENDGRID_API_KEY);
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;
const userRouter = require("./users/users");
const onboardingRouter = require("./users/onboarding");
const breathworkRouter = require("./breathwork/breathwork");
const eventsRouter = require("./events/events");
const savedEntryListsRouter = require("./saved_entry_lists/saved_entry_lists");

app.use("/userRouter", userRouter);
app.use("/breathworkRouter", breathworkRouter);
app.use("/eventsRouter", eventsRouter);
app.use("/onboardingRouter", onboardingRouter);
app.use("/savedEntryListsRouter", savedEntryListsRouter);

require("./runNotificationCronJobs");

app.get('/', (req, res) => {
  res.send('Hello, Andningsapoteket!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
