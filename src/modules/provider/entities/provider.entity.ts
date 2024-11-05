import { User } from '@api/modules/user/entities/user.entity';
import { BaseEntity } from '@api/shared/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';


@Entity('providers')
export class Provider extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.provider)
  users: User[];
}
