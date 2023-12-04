import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import dotenv from 'dotenv';

dotenv.config();
const port: string = process.env.BACKEND_PORT;
const host: string = process.env.BACKEND_HOST;

console.log(`${host}:${port}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  await app.listen(port, host);
}
bootstrap();
