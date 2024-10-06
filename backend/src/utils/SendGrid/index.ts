const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({ to, from, subject, text, html }) {
  sgMail
    .send({
      to,
      from,
      subject,
      text,
      html,
    })
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}
