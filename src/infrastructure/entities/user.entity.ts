import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Role } from "../../enums/role.enum";
import { Group } from "./group.entity";

@Entity({ name: "users" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  @Length(2, 30, {
    message: "The name must be at least 2 but not longer than 30 characters",
  })
  @IsNotEmpty({ message: "The name is required" })
  username!: string;

  @Column()
  @Length(6, 30, {
    message:
      "The password must be at least 6 but not longer than 30 characters",
  })
  @IsNotEmpty({ message: "The password is required" })
  password!: string;

  @Column({ name: "email" })
  @IsEmail({}, { message: "Incorrect email" })
  @IsNotEmpty({ message: "The email is required" })
  email!: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.User,
  })
  role!: Role;

  @CreateDateColumn({ name: "createdate", default: () => "CURRENT_TIMESTAMP" })
  createdate: Date;

  @UpdateDateColumn({ name: "updateddate", default: () => "CURRENT_TIMESTAMP" })
  updateddate: Date;

  @Column({ nullable: true })
  last_login?: Date;

  @Column("varchar", { nullable: true })
  hash_refresh_token: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
