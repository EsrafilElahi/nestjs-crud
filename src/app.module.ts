import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import config from './config/config';

// const dbUser = ConfigService.get<string>('DATABASE_USER');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'esrafil',
      password: '1234',
      database: 'nest',
      entities: [UserEntity],
      synchronize: true,
    }),
    UsersModule,

    // custom nestjs configs
    ConfigModule.forRoot({
      load: [config],
      envFilePath: 'dev.env',
      isGlobal: true, // for use another modules
      cache: true, // as accessing process.env can be slow
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
