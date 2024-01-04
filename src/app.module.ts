import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import config from './config/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // custom confilg db
    // ConfigModule.forRoot({ ---> forRoot is useful when the registerAs is required across entire app
    //   load: [databaseConfig],
    // }),

    // or this
    // ConfigModule.forFeature(databaseConfig) ---> forFeature is useful to ensure the registerAs is only applicable for the module only.

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.POSTGRES_HOST),
      port: Number(process.env.PORT),
      username: String(process.env.POSTGRES_USER),
      password: String(process.env.POSTGRES_PASSWORD),
      database: String(process.env.POSTGRES_DATABASE),
      entities: [UserEntity],
      synchronize: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
      }),
    }),

    UsersModule,

    // custom nestjs configs
    ConfigModule.forRoot({
      load: [config],
      envFilePath: 'dev.env',
      isGlobal: true, // for use another modules
      cache: true, // as accessing process.env can be slow
    }),

    // rate limit config
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
