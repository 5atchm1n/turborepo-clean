import { ApiProperty } from "@nestjs/swagger";

export class SubscribeNewsletterDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  subscribe?: boolean;
}
