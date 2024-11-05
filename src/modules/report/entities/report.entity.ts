import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({name: 'reports'})
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  provider: string;

  @Column()
  consultorId: number;

  @Column({ length: 50 })
  userWinId: string;

  @Column()
  jiraId: string;

  @Column({ length: 100 })
  axityTribe: string;

  @Column({ length: 100 })
  axitySquadLead: string;

  @Column({ length: 100 })
  wmTechLead: string;

  @Column()
  assignmentProject: number;

  @Column()
  professionalName: string;

  @Column()
  proyectName: string;

  @Column()
  hours: number;

  @Column()
  date: string;

  @Column({ length: 500 })
  activitiesDescription: string;

  @Column({ length: 500 })
  deliverables: string;

  @Column({ length: 500 })
  comments: string;
}
