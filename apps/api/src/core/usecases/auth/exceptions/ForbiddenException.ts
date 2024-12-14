import { HttpStatus } from "@nestjs/common";
import { IExceptions } from "../../../domain";

export class ForbiddenException extends IExceptions {
  constructor(message: string) {
    super("error.forbidden.request", message);
    this.errorStatus = HttpStatus.FORBIDDEN;
  }
}
