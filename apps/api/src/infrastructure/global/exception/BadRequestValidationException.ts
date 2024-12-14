import { HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { IExceptions } from "../../../core";

export class BadRequestValidationException extends IExceptions {
  constructor(errors: ValidationError[]) {
    super("error.bad.request", errors.join(","));
    this.errorStatus = HttpStatus.BAD_REQUEST;
  }
}
