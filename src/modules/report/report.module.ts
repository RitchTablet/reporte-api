import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DateService } from '@services/date.service';
import { FileService } from '@services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { FileEntity } from '@shared/entities/file.entity';
import { MailService } from '@api/services/mail.service';
import { MailConfig } from '@api/shared/entities/mail-config.entity';
import { User } from '@modules/user/entities/user.entity';

import { TeamLead } from '@modules/team-lead/entities/team-lead.entity';
import { Tribe } from '@modules/tribe/entities/tribe.entity';
import { Proyect } from '@modules/proyect/entities/project.entity';
import { Provider } from '@modules/provider/entities/provider.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Report, FileEntity, MailConfig, User, TeamLead, Proyect, Tribe, Provider])],
  controllers: [ReportController],
  providers: [ReportService, FileService, DateService, MailService],
})
export class ReportModule {}
