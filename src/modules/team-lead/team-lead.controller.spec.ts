import { Test, TestingModule } from '@nestjs/testing';
import { TeamLeadController } from './team-lead.controller';
import { TeamLeadService } from './team-lead.service';

describe('TeamLeadController', () => {
  let controller: TeamLeadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamLeadController],
      providers: [TeamLeadService],
    }).compile();

    controller = module.get<TeamLeadController>(TeamLeadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
