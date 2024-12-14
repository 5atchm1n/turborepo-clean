import { ApiProperty } from "@nestjs/swagger";
import { ProjectData } from "../../../../core";
import { ApiImage } from "../../image/model";
import { ApiUser } from "../../user/models";

export class ApiProject {
  constructor(data: ProjectData) {
    this.id = data.project.id;
    this.name = data.project.name;
    this.description = data.project.description;
    this.created_at = data.project.createdAt.toISOString();
    this.updated_at = data.project.updatedAt.toISOString();
    this.user = new ApiUser(data.user);
    this.images = data.images.map((image) => new ApiImage(image));
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  user: ApiUser;

  @ApiProperty()
  images: ApiImage[];
}
