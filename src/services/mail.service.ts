import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { MailConfig } from '@api/shared/entities/mail-config.entity';
import { MailRecipients } from '@api/shared/entities/mail-recipient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

dotenv.config();

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(MailConfig)
    private readonly mailConfigRepository: Repository<MailConfig>,
  ) {}

  async getMailConfig(): Promise<MailConfig> {
    return this.mailConfigRepository.findOne({
      relations: ['recipients'],
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    attachments: { filename: string; path: string }[] = [],
  ) {
    const mailConfig = await this.getMailConfig();
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password,
      },
    });

    const ccRecipients = mailConfig.recipients
      .filter((recipient) => recipient.type === 'cc')
      .map((recipient) => recipient.email);

    const bccRecipients = mailConfig.recipients
      .filter((recipient) => recipient.type === 'bcc')
      .map((recipient) => recipient.email);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments,
      cc: ccRecipients.length ? ccRecipients : undefined,
      bcc: bccRecipients.length ? bccRecipients : undefined,
    };

    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('No se pudo enviar el correo.');
    }
  }
}
