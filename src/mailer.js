import nodemailer from 'nodemailer';

const from = '"BookArchive" <habib@info.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}


export function sendConfimationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to BookArchive",
    text: `
      Welcome to BookArchive, Please, confirm your email.

      ${user.generateConfirmationUrl()}
    `
  };

  transport.sendMail(email);
}
