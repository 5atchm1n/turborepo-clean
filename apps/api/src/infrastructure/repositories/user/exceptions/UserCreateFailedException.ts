import { HttpStatus } from "@nestjs/common";
import { IExceptions } from "../../../../core";

export class UserCreateFailedException extends IExceptions {
  constructor() {
    super("user.create.failed", "Failed to create user.");
    this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
