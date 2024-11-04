import { Column, Entity, ManyToOne } from "typeorm";
import { FileEntity } from "./file.entity";
import { BaseEntity } from "./base.entity";

@Entity({name: 'file_statuses'})
export class FileStatusEntity extends BaseEntity {  
  @ManyToOne(() => FileEntity, file => file.statuses)
  file: FileEntity;

  @Column()
  status: string;

  @Column()
  sentAt: Date;

  @Column({ nullable: true })
  errorMessage: string;  
}
