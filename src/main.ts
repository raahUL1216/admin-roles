import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./infrastructure/common/filter/exception.filter";
import { LoggingInterceptor } from "./infrastructure/common/interceptors/logger.interceptor";
import {
  ResponseFormat,
  ResponseInterceptor,
} from "./infrastructure/common/interceptors/response.interceptor";
import { LoggerService } from "./infrastructure/logger/logger.service";

import { Prisma, PrismaClient, Role } from "@prisma/client";
import { PrismaService } from "./infrastructure/services/prisma/prisma.service";

let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  app.setGlobalPrefix("api_v1");

  // swagger config
  if (env !== "production") {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle("Admin Roles")
      .setDescription("Admin roles")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(3000);

  try {
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
  } catch (err) {
    console.log(err);
  }
}

bootstrap().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
