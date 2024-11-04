import { BaseEntity } from '@shared/entities/base.entity';
import { Exclude } from 'class-transformer';
import { Entity, Column } from 'typeorm';

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
}
