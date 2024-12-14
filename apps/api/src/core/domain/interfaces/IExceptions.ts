import { HttpStatus } from "@nestjs/common";

export abstract class IExceptions extends Error {
  protected errorStatus: HttpStatus;
  protected errorCode: string;

  protected constructor(code: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = code;
    Error.captureStackTrace(this, this.constructor);
  }

  public getStatus(): HttpStatus {
    return this.errorStatus;
  }

  public getErrorCode(): string {
    return this.errorCode;
  }
}
