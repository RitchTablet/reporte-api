import { Module } from '@nestjs/common';
import { TeamLeadService } from './team-lead.service';
import { TeamLeadController } from './team-lead.controller';

@Module({
  controllers: [TeamLeadController],
  providers: [TeamLeadService],
})
export class TeamLeadModule {}
