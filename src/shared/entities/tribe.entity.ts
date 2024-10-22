import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tribes')
export class Tribe extends BaseEntity {
  @Column()
  name: string;
}
