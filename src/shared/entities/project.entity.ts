import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  name: string;
}
