import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

if (process.env.NODE_ENV === "local") {
  dotenv.config({ path: "./src/env/local.env" });
}

export const AdminDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrationsTableName: "admin-migrations",
  migrations: ["./src/domain/migrations/*{.ts,.js}"],
});

export default AdminDataSource;
