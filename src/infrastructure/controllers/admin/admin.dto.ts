import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "@prisma/client";

export class UserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly role: Role;
}

export class UserGroupDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly group_id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly user_ids: number[];
}
