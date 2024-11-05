import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from '@api/modules/user/entities/user.entity';

@Entity('tribes')
export class Tribe extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.tribe)
  users: User[];
}
