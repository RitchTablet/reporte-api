import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamLeadDto } from './create-team-lead.dto';

export class UpdateTeamLeadDto extends PartialType(CreateTeamLeadDto) {}
