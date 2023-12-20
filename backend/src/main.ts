import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();
const port: string = process.env.BACKEND_PORT;
const host: string = process.env.BACKEND_HOST;

console.log(`${host}:${port}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(port, host);
}
bootstrap();
