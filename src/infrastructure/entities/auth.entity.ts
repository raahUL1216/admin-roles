import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "auth" })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  user_id: number;

  @Column("int")
  session_id: number;
}
