import { IExceptions } from "../../../core";
import { ValidationError } from "class-validator";
import { HttpStatus } from "@nestjs/common";

export class BadRequestValidationException extends IExceptions {
  constructor(errors: ValidationError[]) {
    super("error.bad.request", errors.join(","));
    this.errorStatus = HttpStatus.BAD_REQUEST;
  }
}
