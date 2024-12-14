import { Server } from "node:net";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import * as cookieParser from "cookie-parser";
import {
  BadRequestValidationException,
  LoggerService,
} from "../../infrastructure";
import {
  AllExceptionFilter,
  LoggingInterceptor,
  ResponseInterceptor,
} from "../index";

export function setupNestApplication(app: INestApplication<Server>): void {
  /* Cookie */
  app.use(cookieParser());

  /* Pipes */
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestValidationException(errors);
      },
    }),
  );

  // /* Interceptors */
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  /* Filters */
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
}
