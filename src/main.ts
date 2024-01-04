import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
  });

  await app.listen(5000);
}
bootstrap();
