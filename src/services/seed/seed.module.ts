import { User } from '@api/modules/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { MailConfig } from '@api/shared/entities/mail-config.entity';
import { Project } from '@api/shared/entities/project.entity';
import { TeamLead } from '@api/shared/entities/team-lead.entity';
import { Tribe } from '@api/shared/entities/tribe.entity';
import { Provider } from '@api/modules/provider/entities/provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MailConfig, TeamLead, Project, Tribe, Provider]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
