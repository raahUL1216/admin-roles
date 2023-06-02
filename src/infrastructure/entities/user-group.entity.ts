import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity({ name: "user-group" })
export class UserGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "group id is required" })
  group_id: number;

  @Column()
  @IsNotEmpty({ message: "group id is required" })
  user_id: number;

  constructor(group_id: number, user_id: number) {
    this.group_id = group_id;
    this.user_id = user_id;
  }
}
