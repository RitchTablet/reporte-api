import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from '@modules/report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from '@modules/report/entities/report.entity';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { FileEntity } from '@shared/entities/file.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from '@services/cron.service';
import { ReportService } from '@report/report.service';
import { DateService } from '@services/date.service';
import { FileService } from '@services/file.service';
import { MailService } from '@api/services/mail.service';
import { UserModule } from '@modules/user/user.module';
import { entities } from './entities.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@shared/passport-strategies/jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@shared/guards/jwt.guard';

import { TribeModule } from '@modules/tribe/tribe.module';
import { TeamLeadModule } from '@modules/team-lead/team-lead.module';
import { ProjectModule } from '@api/modules/proyect/project.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProviderModule } from './modules/provider/provider.module';
import { SeedModule } from './services/seed/seed.module';
import { SeedService } from './services/seed/seed.service';
import { ConfigModule as MyConfigModule } from './modules/config/config.module';
import { MailConfig } from './shared/entities/mail-config.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: entities,
      synchronize: true,
    }),
    PassportModule.register({  defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME', '12h'),
        },
      }),
      global: true,
    }),
    ScheduleModule.forRoot(),
    ReportModule,
    TypeOrmModule.forFeature([ReportEntity, FileEntity, MailConfig]),
    UserModule,
    AuthModule,
    TribeModule,
    TeamLeadModule,
    ProjectModule,
    ProviderModule,
    SeedModule,
    MyConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CronService,
    ReportService,
    DateService,
    FileService,
    MailService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy
  ],
})
export class AppModule implements OnModuleInit {  
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.runSeed();
  }
}
