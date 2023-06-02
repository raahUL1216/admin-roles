import * as Reflect from "reflect-metadata";
import AdminDataSource from "./infrastructure/config/typeorm/typeorm.config";
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
  //   app.setGlobalPrefix("api_v1");

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
    await AdminDataSource.initialize();
  } catch (err) {
    console.log("abc");
    console.log(err);
    console.log("abc");
  }
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
