import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly _projectService: ProjectService) {}
  
  @Get()
  findAll() {
    return this._projectService.findAll();
  }
}
