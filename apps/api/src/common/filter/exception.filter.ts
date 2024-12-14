import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { IExceptions } from "../../core";
import { LoggerService } from "../../infrastructure";

interface ErrorResponse {
  status: HttpStatus;
  errorCode: string;
  message: string;
  timestamp: string;
  path: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.formatErrorResponse(exception, request.url);

    this.logMessage(request, errorResponse, exception);
    response.status(errorResponse.status).json(errorResponse);
  }

  private logMessage(
    request: Request,
    response: ErrorResponse,
    exception: Error,
  ): void {
    const logMessage = `method=${request.method} status=${response.status} code_error=${response.errorCode} message=${response.message}`;
    if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `End Request for ${request.path}`,
        logMessage,
        exception.stack,
      );
    } else {
      this.logger.warn(`End Request for ${request.path}`, logMessage);
    }
  }

  private formatErrorResponse(exception: Error, url: string): ErrorResponse {
    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        errorCode: "no.error.code",
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: url,
      };
    }
    if (exception instanceof IExceptions) {
      return {
        status: exception.getStatus(),
        errorCode: exception.getErrorCode(),
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: url,
      };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: "error.unhandled.exception",
      message: "Internal server error",
      timestamp: new Date().toISOString(),
      path: url,
    };
  }
}
