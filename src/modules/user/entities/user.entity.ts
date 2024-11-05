import { Provider } from '@api/modules/provider/entities/provider.entity';
import { MailConfig } from '@api/shared/entities/mail-config.entity';
import { Project } from '@api/shared/entities/project.entity';
import { TeamLead } from '@api/shared/entities/team-lead.entity';
import { Tribe } from '@api/shared/entities/tribe.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { Exclude } from 'class-transformer';
import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() 
  password: string;

  @Column()  
  name: string;

  @Column({ type: 'int' })
  idConsultor: number;

  @Column({ type: 'varchar', length: 100 })
  idJira: string;

  @Column({ type: 'varchar', length: 100 })
  usuarioWindows: string;

  @ManyToOne(() => TeamLead, (teamLead) => teamLead.usersAsTeachLead)
  @JoinColumn({ name: 'teachLeadId' })
  teachLead: TeamLead;
  
  @ManyToOne(() => TeamLead, (teamLead) => teamLead.usersAsSquadLead)
  @JoinColumn({ name: 'squadLeadId' })
  squadLead: TeamLead;
  
  @ManyToOne(() => Project, (project) => project.users)
  @JoinColumn({ name: 'projectId' })
  project: Project;
  
  @ManyToOne(() => Tribe, (tribe) => tribe.users)
  @JoinColumn({ name: 'tribeId' })
  tribe: Tribe;

  @ManyToOne(() => Provider, (provider) => provider.users)
  @JoinColumn({ name: 'providerId' })
  provider: Provider;

  @OneToOne(() => MailConfig, { cascade: true, eager: true })
  @JoinColumn({ name: 'mailConfigId' })
  mailConfig: MailConfig;
}
