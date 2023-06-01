import { ApiProperty } from "@nestjs/swagger";

export class UserPresenter {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: number;
}
