import { BaseEntity } from '@api/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';


@Entity('providers')
export class Provider extends BaseEntity {
  @Column()
  name: string;
}
