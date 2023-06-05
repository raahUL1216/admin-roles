import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Permission } from "../../enums/permission.enum";
import { Role } from "@prisma/client";
import { FunctionName } from "../../enums/functionName.enum";

@Entity()
export class RolePermission {

    @PrimaryGeneratedColumn()
    id: number

	@Column()
	role: Role

    @Column()
    permission: Permission

	@Column()
	function: FunctionName
}
