import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from '@api/modules/user/entities/user.entity';

export enum LeadType {
  TEACH = 'teach',
  SQUAD = 'squad',
}

export enum EmpresaType {
  AXITY = 'axity',
  WALMART = 'walmart',
}

@Entity('team_leads')
export class TeamLead extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  tipoLead: LeadType;

  @Column({
    type: 'text',
  })
  empresa: EmpresaType;

  @OneToMany(() => User, (user) => user.teachLead)
  usersAsTeachLead: User[];

  @OneToMany(() => User, (user) => user.squadLead)
  usersAsSquadLead: User[];
}
