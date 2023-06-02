import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity({ name: "groups" })
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "group name is required" })
  group_name: string;

  constructor(group_name: string) {
    this.group_name = group_name;
  }
}
