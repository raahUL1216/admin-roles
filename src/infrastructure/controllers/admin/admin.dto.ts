import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "@prisma/client";

export class AdminDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class GroupDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly admin: number;
}

export class UserGroupDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly group_id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  readonly user_ids: number[];
}
