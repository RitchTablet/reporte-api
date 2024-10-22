import { ReportEntity } from "@report/entities/report.entity";
import { FileEntity } from "@shared/entities/file.entity";
import { Project } from "@shared/entities/project.entity";
import { Provider } from "@api/modules/provider/entities/provider.entity";
import { TeamLead } from "@shared/entities/team-lead.entity";
import { Tribe } from "@shared/entities/tribe.entity";
import { User } from "@modules/user/entities/user.entity";

export const entities = [
    ReportEntity, FileEntity,
    Project, Provider, TeamLead, Tribe,
    User
];