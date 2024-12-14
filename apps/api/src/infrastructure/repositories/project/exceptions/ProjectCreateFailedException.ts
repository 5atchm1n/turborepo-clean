import { HttpStatus } from "@nestjs/common";
import { IExceptions } from "../../../../core";

export class ProjectCreateFailedException extends IExceptions {
  constructor() {
    super("project.create.failed", "Failed to create project.");
    this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
