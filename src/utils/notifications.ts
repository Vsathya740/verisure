import twilio from 'twilio';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;


// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

// Initialize Twilio client
const twilioClient = twilio(accountSid, authToken);

// Initialize email transporter
const emailTransporter = nodemailer.createTransport(emailConfig);

export class NotificationService {
  /**
   * Send SMS using Twilio
   * @param to - Recipient phone number
   * @param message - SMS message content
   */
  static async sendSMS(to: string, message: string): Promise<void> {
    try {
      await twilioClient.messages.create({
        body: message,
        to: to,
        from: twilioPhoneNumber,
      });
      console.log(`SMS sent successfully to ${to}`);
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  /**
   * Send email using nodemailer
   * @param to - Recipient email address
   * @param subject - Email subject
   * @param html - Email content in HTML format
   */
  static async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        html: html,
      });
      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Send both SMS and email notifications
   * @param phoneNumber - Recipient phone number
   * @param email - Recipient email address
   * @param smsMessage - SMS message content
   * @param emailSubject - Email subject
   * @param emailHtml - Email content in HTML format
   */
  static async sendNotifications(
    phoneNumber: string,
    email: string,
    smsMessage: string,
    emailSubject: string,
    emailHtml: string
  ): Promise<void> {
    try {
      await Promise.all([
        this.sendSMS(phoneNumber, smsMessage),
        this.sendEmail(email, emailSubject, emailHtml),
      ]);
      console.log('Notifications sent successfully');
    } catch (error) {
      console.error('Error sending notifications:', error);
      throw error;
    }
  }
} 