import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../../../core";

export class ApiUser {
  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
