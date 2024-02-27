import * as nodemailer from 'nodemailer';
import config from '../config/config';

export default class NodeMailer {
  private transporter: nodemailer.Transporter;
  private gmailUser;
  private gmailPass;

  constructor() {
    this.gmailUser = config.nodemailer.email;
    this.gmailPass = config.nodemailer.appPass;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.gmailUser,
        pass: this.gmailPass,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    console.log("Nodemailer init . . . .  Waiting for send Email");
    
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.gmailUser,
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
