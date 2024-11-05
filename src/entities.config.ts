import { Report } from "@report/entities/report.entity";
import { FileEntity } from "@shared/entities/file.entity";
import { Project } from "@shared/entities/project.entity";
import { Provider } from "@api/modules/provider/entities/provider.entity";
import { TeamLead } from "@shared/entities/team-lead.entity";
import { Tribe } from "@shared/entities/tribe.entity";
import { User } from "@modules/user/entities/user.entity";
import { FileStatusEntity } from "@shared/entities/file-status.entity";
import { MailConfig } from "./shared/entities/mail-config.entity";
import { MailRecipients } from "./shared/entities/mail-recipient.entity";

export const entities = [
    Report, FileEntity,
    Project, Provider, TeamLead, Tribe,
    User, FileStatusEntity, MailConfig, MailRecipients
];