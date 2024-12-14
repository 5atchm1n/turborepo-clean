import { IExceptions } from "../../../../core";
import { HttpStatus } from "@nestjs/common";

export class ImageCreationFailedError extends IExceptions {
  constructor() {
    super("image.create.failed", "Failed to create image.");
    this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
