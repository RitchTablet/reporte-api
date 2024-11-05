import { Entity, Column, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "@shared/entities/base.entity";
import { MailRecipients } from "./mail-recipient.entity";
import { User } from "@api/modules/user/entities/user.entity";

@Entity({name: 'mail_configs'})
export class MailConfig extends BaseEntity {  
    @Column()
    host: string;
  
    @Column({ type: 'int' })
    port: number;
  
    @Column()
    user: string;
  
    @Column()
    password: string;
  
    @Column({ default: false })
    secure: boolean;
  
    @Column()
    fromEmail: string;
  
    @OneToMany(() => MailRecipients, (recipients) => recipients.mailConfig, { cascade: true })
    recipients: MailRecipients[];

    @OneToOne(() => User, (user) => user.mailConfig)
    userEntity: User;
}
