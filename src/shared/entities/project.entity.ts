import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from '@api/modules/user/entities/user.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.project)
  users: User[];
}
