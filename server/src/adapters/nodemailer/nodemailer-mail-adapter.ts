import { MailAdapter, MailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fa1ca36fcff140",
    pass: "d343e3b9d4292e"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: MailData){
  await transport.sendMail({
      from: '"Feedback" <oi@feedback.com>',
      to: 'William Will <williamdeo@gmail.com>',
      subject: subject,
      html: body
    })
  } 
}