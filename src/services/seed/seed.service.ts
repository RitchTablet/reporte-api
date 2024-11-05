import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@api/modules/user/entities/user.entity';
import { MailConfig } from '@api/shared/entities/mail-config.entity';
import { Tribe } from '@api/modules/tribe/entities/tribe.entity';
import {
  EmpresaType,
  LeadType,
  TeamLead,
} from '@api/shared/entities/team-lead.entity';
import { Project } from '@api/shared/entities/project.entity';
import { Provider } from '@api/modules/provider/entities/provider.entity';

@Injectable()
export class SeedService {
  private readonly _logger = new Logger(SeedService.name);

  private readonly _defaultSquadLead: string = 'Marta Alicia Cuamatzi Cuamatzi';
  private readonly _defaultTeachLead: string = 'Victor Flores';
  private readonly _defaultProject: string =
    'MX - MER - Inteligencia de Precios / Dig. Cambios de Precio (PriceX, DP, FyV)';
  private _defaultTribe: string = 'Datos';
  private _defaultProvider: string = 'Axity';

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MailConfig)
    private readonly mailConfigRepository: Repository<MailConfig>,

    @InjectRepository(TeamLead)
    private readonly teamLeadRepository: Repository<TeamLead>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Tribe)
    private readonly tribeRepository: Repository<Tribe>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async runSeed() {
    await this.createDefaultMailConfig();
    await this.createDefaultTeamLeads();
    await this.createDefaultProjects();
    await this.createDefaultTribes();
    await this.createDefaultProvider();
    await this.createDefaultUser();
  }

  private async createDefaultUser() {
    const defaultEmail = 'jesus.alarcon@axity.com';

    const userExists = await this.userRepository.findOneBy({
      email: defaultEmail,
    });

    if (userExists) {
      this._logger.warn(
        'El usuario predeterminado ya existe. No se requiere seeding.',
      );
      return;
    }

    const provider = await this.providerRepository.findOneBy({
      name: this._defaultProvider,      
    });

    const teachLead = await this.teamLeadRepository.findOneBy({
      name: this._defaultTeachLead,
      tipoLead: LeadType.TEACH,
    });

    const squadLead = await this.teamLeadRepository.findOneBy({
      name: this._defaultSquadLead,
      tipoLead: LeadType.SQUAD,
    });

    const project = await this.projectRepository.findOneBy({
      name: this._defaultProject,
    });

    const tribe = await this.tribeRepository.findOneBy({
      name: this._defaultTribe,
    });
    
    const defaultHost = 'smtp.office365.com';
    const defaultUser = 'Jesus.Alarcon@axity.com';

    const mail = await this.mailConfigRepository.findOneBy({
      host: defaultHost,
      user: defaultUser,
    });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('Admin126663', salt);

    const newUser = this.userRepository.create({
      email: defaultEmail,
      password: hashedPassword,
      idConsultor: 31949,
      name: 'Jesus Raul Alarcon Ontiveros',
      idJira: 'ROADSUBIN-17833',
      usuarioWindows: 'vn57kvr',
      provider: provider || null,
      teachLead: teachLead || null,
      squadLead: squadLead || null,
      project: project || null,
      tribe: tribe || null,
      mailConfig: mail || null
    });

    await this.userRepository.save(newUser);
    this._logger.log('Usuario predeterminado creado correctamente.');
  }

  private async createDefaultMailConfig() {
    const defaultHost = 'smtp.office365.com';
    const defaultUser = 'Jesus.Alarcon@axity.com';

    const mailConfigExists = await this.mailConfigRepository.findOneBy({
      host: defaultHost,
      user: defaultUser,
    });

    if (mailConfigExists) {
      this._logger.warn(
        'La configuración de correo predeterminada ya existe. No se requiere seeding.',
      );
      return;
    }

    const newMailConfig = this.mailConfigRepository.create({
      host: defaultHost,
      port: 587,
      user: defaultUser,
      password: '',
      secure: false,
      fromEmail: 'no-reply@example.com',
    });

    await this.mailConfigRepository.save(newMailConfig);
    this._logger.log(
      'Configuración de correo predeterminada creada correctamente.',
    );
  }

  private async createDefaultTeamLeads() {
    const defaultTeamLeads = [
      {
        name: this._defaultSquadLead,
        tipoLead: LeadType.SQUAD,
        empresa: EmpresaType.AXITY,
      },
      {
        name: this._defaultTeachLead,
        tipoLead: LeadType.TEACH,
        empresa: EmpresaType.WALMART,
      },
    ];

    for (const leadData of defaultTeamLeads) {
      const leadExists = await this.teamLeadRepository.findOneBy({
        name: leadData.name,
      });

      if (!leadExists) {
        const newLead = this.teamLeadRepository.create(leadData);
        await this.teamLeadRepository.save(newLead);
        this._logger.log(`Team Lead ${leadData.name} creado correctamente.`);
      } else {
        this._logger.warn(
          `El Team Lead ${leadData.name} ya existe. No se requiere seeding.`,
        );
      }
    }
  }

  private async createDefaultProjects() {
    const defaultProjects = [
      {
        name: this._defaultProject,
      },
    ];

    for (const projectData of defaultProjects) {
      const projectExists = await this.projectRepository.findOneBy({
        name: projectData.name,
      });

      if (!projectExists) {
        const newProject = this.projectRepository.create(projectData);
        await this.projectRepository.save(newProject);
        this._logger.log(`Proyecto ${projectData.name} creado correctamente.`);
      } else {
        this._logger.warn(
          `El Proyecto ${projectData.name} ya existe. No se requiere seeding.`,
        );
      }
    }
  }

  private async createDefaultTribes() {
    const defaultTribes = [{ name: this._defaultTribe }];

    for (const tribeData of defaultTribes) {
      const tribeExists = await this.tribeRepository.findOneBy({
        name: tribeData.name,
      });

      if (!tribeExists) {
        const newTribe = this.tribeRepository.create(tribeData);
        await this.tribeRepository.save(newTribe);
        this._logger.log(`Tribu ${tribeData.name} creada correctamente.`);
      } else {
        this._logger.warn(
          `La Tribu ${tribeData.name} ya existe. No se requiere seeding.`,
        );
      }
    }
  }

  private async createDefaultProvider() {
    const providerExist = await this.providerRepository.findOneBy({
      name: this._defaultProvider,
    });

    if (providerExist) {
      this._logger.warn(
        `El Proveedor ${providerExist.name} ya existe. No se requiere seeding.`,
      );
      return;
    }

    const newProvider = this.providerRepository.create({
      name: this._defaultProvider,
    });

    await this.providerRepository.save(newProvider);
    this._logger.log(`Proveedor ${newProvider.name} creada correctamente.`);
  }
}
