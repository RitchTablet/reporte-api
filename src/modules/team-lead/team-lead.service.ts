import { Injectable } from '@nestjs/common';
import { CreateTeamLeadDto } from './dto/create-team-lead.dto';
import { UpdateTeamLeadDto } from './dto/update-team-lead.dto';

@Injectable()
export class TeamLeadService {
  create(createTeamLeadDto: CreateTeamLeadDto) {
    return 'This action adds a new teamLead';
  }

  findAll() {
    return `This action returns all teamLead`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamLead`;
  }

  update(id: number, updateTeamLeadDto: UpdateTeamLeadDto) {
    return `This action updates a #${id} teamLead`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamLead`;
  }
}
