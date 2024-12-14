import { IExceptions } from "../../../../core";
import { HttpStatus } from "@nestjs/common";

export class ProjectNotFoundException extends IExceptions {
  constructor() {
    super("project.update.failed", "Failed to update project.");
    this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
