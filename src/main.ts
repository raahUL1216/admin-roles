import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import adminDataSource from './infrastructure/config/typeorm/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  await adminDataSource.initialize();
}

bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});;
