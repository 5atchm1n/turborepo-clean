import { IExceptions } from "../../../domain";
import { HttpStatus } from "@nestjs/common";

export class ForbiddenException extends IExceptions {
  constructor(message: string) {
    super("error.forbidden.request", message);
    this.errorStatus = HttpStatus.FORBIDDEN;
  }
}
