const Event = require('../model/eventModel');
const {sendEmail} = require("../middleware/middleware")

async function sendEmailNotification(emailAddress, title, startTime) {
  
  try {
    let subject = `Reminder: Event "${title}" starts in 15 minutes`
    let text = `Event "${title}" is scheduled to start at ${startTime}.`
    await sendEmail({emailAddress, subject, text});
    console.log('Email notification sent');
  } catch (err) {
    console.error('Error sending email notification:', err);
  }
}

async function createEvent(req, res) {
  try {
    const { title, startTime, endTime, emailAddress } = req.body;

    const parsedStartTime = new Date(startTime);

    if (startTime >= endTime) {
      return res.status(400).send({ status: false, message: 'Start time must be before end time' });
    }
    const event = await Event.create({ title, startTime, endTime, emailAddress });

    const notificationTime = new Date(parsedStartTime.getTime() - 15 * 60000);
    const currentTime = new Date();
    const timeUntilNotification = notificationTime.getTime() - currentTime.getTime();
    setTimeout(() => {
     sendEmailNotification(event.emailAddress, event.title, event.startTime);
    }, timeUntilNotification);

    res.status(201).send({ status: true, message: 'Event created successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false, message: 'An error occurred' });
  }
}

module.exports = {
  createEvent
};
