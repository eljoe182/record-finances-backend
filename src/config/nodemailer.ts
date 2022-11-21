import { config } from "dotenv";
import nodemailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { variables } from './variables';

config({ path: ".env" });

const options = {
  host: variables.MAIL.HOST,
  port: variables.MAIL.PORT,
  auth: {
    user: variables.MAIL.USER,
    pass: variables.MAIL.PASS,
  },
}

export const transport = nodemailer.createTransport(options as SMTPTransport.Options);
