import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ required: true })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  lastName: string;
}