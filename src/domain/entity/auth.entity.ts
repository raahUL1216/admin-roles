import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    id: number

	@Column('int')
	user_id: number

	@Column('int')
	session_id: number
}
