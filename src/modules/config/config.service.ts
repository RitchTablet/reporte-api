import { MailConfig } from '@api/shared/entities/mail-config.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configs } from '@modules/config/interfaces/configs';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(MailConfig)
    private readonly _mailConfigRepository: Repository<MailConfig>,
  ) {}

  async findAll(userId: number): Promise<Configs> {
    const { user, password } = await this._mailConfigRepository.findOne({
      where: {
        userEntity: { id: userId },
      },
      relations: ['userEntity'],
    });

    return <Configs>{ mailData: { user, password } };
  }
}
