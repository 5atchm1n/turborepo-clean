import { IExceptions } from "../../../core";

export class BadRequestException extends IExceptions {
  constructor() {
    super("error.bad.request", "Images must all have a description");
  }
}
