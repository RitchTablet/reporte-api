import { User } from '@api/modules/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { MailConfig } from '@api/shared/entities/mail-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, MailConfig])],  
  providers: [SeedService],
  exports:[SeedService]
})
export class SeedModule {}
