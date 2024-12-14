import { IExceptions } from "../../../../core";
import { HttpStatus } from "@nestjs/common";

export class ImageNotFoundError extends IExceptions {
  constructor(message: string) {
    super("image.not.found", message);
    this.errorStatus = HttpStatus.NOT_FOUND;
  }
}
