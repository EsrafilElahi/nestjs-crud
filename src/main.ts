import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const FRONTEND_URL = configService.get<string>('FRONTEND_URL');
  const PORT = configService.get<number>('PORT');

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: FRONTEND_URL,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
  });

  await app.listen(PORT);
}
bootstrap();
