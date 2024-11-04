import { Entity, Column, OneToMany } from "typeorm";
import { FileStatusEntity } from "./file-status.entity";
import { BaseEntity } from "@shared/entities/base.entity";

@Entity({name: 'files'})
export class FileEntity extends BaseEntity {  
  @Column({unique: true})
  name: string;

  @Column()
  type: string;

  @Column()
  month: number;

  @Column()
  year: number;

  @OneToMany(() => FileStatusEntity, status => status.file)
  statuses: FileStatusEntity[];  
}
