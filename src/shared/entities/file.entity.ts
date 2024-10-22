import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name:'files'})
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  @Column()
  type: string;

  @Column()
  month: number;

  @Column()
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
