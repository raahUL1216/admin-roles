import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Role } from "../../enums/role.enum";

@Entity({ name: 'users' })
@Unique(['email'])
export class User {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@Length(2, 30, { message: 'The name must be at least 2 but not longer than 30 characters' })
	@IsNotEmpty({ message: 'The name is required' })
	name!: string;

	@Column()
	@Length(6, 30, { message: 'The password must be at least 6 but not longer than 30 characters' })
	@IsNotEmpty({ message: 'The password is required' })
	password!: string;

	@Column({ name: 'email' })
	@IsEmail({}, { message: 'Incorrect email' })
	@IsNotEmpty({ message: 'The email is required' })
	email!: string;

	@Column({
		type: "enum",
		enum: Role,
		default: Role.User
	})
	role!: Role;

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}