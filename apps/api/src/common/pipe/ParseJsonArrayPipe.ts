import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { CreateImageDto } from "../../api/controllers/project/models";

export class ParseJsonArrayPipe implements PipeTransform {
  transform(
    value: string | object,
    metadata: ArgumentMetadata,
  ): CreateImageDto {
    if (metadata.type === "body" && typeof value === "string") {
      try {
        return JSON.parse(value) as CreateImageDto;
      } catch (error) {
        throw new BadRequestException("Invalid JSON format");
      }
    }
    return value as CreateImageDto;
  }
}
