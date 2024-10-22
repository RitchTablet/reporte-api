import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamLeadService } from './team-lead.service';
import { CreateTeamLeadDto } from './dto/create-team-lead.dto';
import { UpdateTeamLeadDto } from './dto/update-team-lead.dto';

@Controller('team-lead')
export class TeamLeadController {
  constructor(private readonly teamLeadService: TeamLeadService) {}

  @Post()
  create(@Body() createTeamLeadDto: CreateTeamLeadDto) {
    return this.teamLeadService.create(createTeamLeadDto);
  }

  @Get()
  findAll() {
    return this.teamLeadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamLeadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamLeadDto: UpdateTeamLeadDto) {
    return this.teamLeadService.update(+id, updateTeamLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamLeadService.remove(+id);
  }
}
