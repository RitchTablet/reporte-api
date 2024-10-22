import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
