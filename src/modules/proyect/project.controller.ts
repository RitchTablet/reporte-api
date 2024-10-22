import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Public } from '@api/shared/decorators/public.decorator';

@Public()
@Controller('project')
export class ProjectController {
  constructor(private readonly _projectService: ProjectService) {}
  
  @Get()
  findAll() {
    return this._projectService.findAll();
  }
}
