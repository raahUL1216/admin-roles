import { Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class AdminPresenter {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  role: Role;
}

export class UserGroupPresenter {
  @ApiProperty()
  @IsNotEmpty()
  group_name: string;

  @ApiProperty()
  @IsNotEmpty()
  admin: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  user_ids?: number[];
}
