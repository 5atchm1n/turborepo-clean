import { ApiProperty } from "@nestjs/swagger";
import { ImageModel } from "../../../../core";

export class ApiImage {
  constructor(image: ImageModel) {
    this.id = image.id;
    this.name = image.name;
    this.url = image.file.url;
    this.description = image.description;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  description: string;
}
