import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MailConfig } from './mail-config.entity';
import { BaseEntity } from './base.entity';

@Entity('mail_recipients')
export class MailRecipients extends BaseEntity {
  @Column()
  email: string;

  @Column({ type: 'varchar', length: 10 })
  type: 'cc' | 'bcc';

  @ManyToOne(() => MailConfig, (mailConfig) => mailConfig.recipients, { onDelete: 'CASCADE' })
  mailConfig: MailConfig;
}