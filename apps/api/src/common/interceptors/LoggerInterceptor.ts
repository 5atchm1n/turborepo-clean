import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IRequest } from "../../core";
import { LoggerService } from "../../infrastructure";

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T> {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<IRequest>();

    const ip = this.getIP(request);

    this.logger.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method} ip=${ip}`,
    );

    return next.handle().pipe<T>(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path}`,
          `method=${request.method} id=${this.logUser(request)} ip=${ip} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }

  private getIP(request: Request): string | undefined {
    let ip: string | undefined;
    const ipAddr = request.headers["x-forwarded-for"];
    if (ipAddr) {
      const ipAddress = ipAddr as string;
      const list = ipAddress.split(",");
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }
    return ip?.replace("::ffff:", "");
  }

  private logUser(request: IRequest): string {
    if (request.user) {
      return `id=${request.user.id}`;
    }
    return "id=PUBLIC";
  }
}
