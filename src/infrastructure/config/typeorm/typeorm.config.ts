import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

if (process.env.NODE_ENV === "local") {
  dotenv.config({ path: "./src/infrastructure/config/prisma/.env" });
}

export const AdminDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: process.env.DATABASE_SCHEMA,
  entities: [join(__dirname, "**", "*.entity.js")],
  synchronize: process.env.DATABASE_SYNCHRONIZE ? true : false,
  migrationsRun: false,
  migrationsTableName: "admin-migrations",
  //   migrations: [join(__dirname, "/domain/migration/*.{js}")],
  ssl: true,
  extra: { ssl: { rejectUnauthorized: false } },
});

export default AdminDataSource;
