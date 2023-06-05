import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSuperAdmin1685456698913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role values ("superadmin") ("admin") ("user") ("poweruser) ("support");
			INSERT INTO user  (name, password, email) values ("rahul", "password", "rahulchodvadiya@gmail.com")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM userrole;
			DELETE FROM user WHERE user = "rahul";`
    );
  }
}
