import { HttpStatus } from "@nestjs/common";
import { IExceptions } from "../../../../core";

export class UserNotFoundException extends IExceptions {
  constructor(userIdentifier: string) {
    super(
      "user.not.found",
      `User with identifier ${userIdentifier} not found.`,
    );
    this.errorStatus = HttpStatus.NOT_FOUND;
  }
}
