import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@api/modules/user/entities/user.entity';
import { MailConfig } from '@api/shared/entities/mail-config.entity';

@Injectable()
export class SeedService {
  private readonly _logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MailConfig)
    private readonly mailConfigRepository: Repository<MailConfig>,
  ) {}

  async runSeed() {
    await this.createDefaultUser();
    await this.createDefaultMailConfig();
  }

  private async createDefaultUser() {
    const defaultEmail = 'jesus.alarcon@axity.com';
    
    const userExists = await this.userRepository.findOneBy({ email: defaultEmail });

    if (userExists) {
      this._logger.warn('El usuario predeterminado ya existe. No se requiere seeding.');
      return;
    }
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('Admin126663', salt);

    const newUser = this.userRepository.create({
      email: defaultEmail,
      password: hashedPassword,
      idConsultor: 31949,
      name: 'Jesus Raul Alarcon Ontiveros',
      idJira: 'ROADSUBIN-17833',
      usuarioWindows: 'vn57kvr',
    });

    await this.userRepository.save(newUser);
    this._logger.log('Usuario predeterminado creado correctamente.');
    
  }

  private async createDefaultMailConfig() {
    const defaultHost = 'smtp.office365.com';
    const defaultUser = 'Jesus.Alarcon@axity.com';
    
    const mailConfigExists = await this.mailConfigRepository.findOneBy({ host: defaultHost, user: defaultUser });

    if (mailConfigExists) {
      this._logger.warn('La configuración de correo predeterminada ya existe. No se requiere seeding.');
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
    this._logger.log('Configuración de correo predeterminada creada correctamente.');
  }
}
