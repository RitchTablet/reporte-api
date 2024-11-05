import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailConfig } from '@api/shared/entities/mail-config.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MailConfig])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
