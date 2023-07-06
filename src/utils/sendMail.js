import { createTransport } from 'nodemailer';

export default async function (from, subject, text) {
  const mailOptions = { from, to: process.env.MAILER_USER, subject, text };
  const transporter = createTransport({
    host: process.env.MAILER_HOST,
    port: +process.env.MAILER_PORT,
    secure: +process.env.MAILER_PORT === 465,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_USER_PASSWORD
    }
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({...error, status: 500});
      } else {
        resolve(info);
      }
    });
  });
}
