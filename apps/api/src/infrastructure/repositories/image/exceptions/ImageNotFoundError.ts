import { HttpStatus } from "@nestjs/common";
import { IExceptions } from "../../../../core";

export class ImageNotFoundError extends IExceptions {
  constructor(message: string) {
    super("image.not.found", message);
    this.errorStatus = HttpStatus.NOT_FOUND;
  }
}
