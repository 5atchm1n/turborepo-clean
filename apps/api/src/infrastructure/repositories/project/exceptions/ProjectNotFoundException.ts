import { HttpStatus } from "@nestjs/common";
import { IExceptions } from "../../../../core";

export class ProjectNotFoundException extends IExceptions {
  constructor() {
    super("project.update.failed", "Failed to update project.");
    this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
