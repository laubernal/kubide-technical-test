import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1730537299268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('kubide', true);

    await queryRunner.query(`
        CREATE TABLE "users" (
            "us_id" VARCHAR PRIMARY KEY,
            "us_name" VARCHAR NOT NULL,
            "us_email" VARCHAR NOT NULL,
            "us_password" VARCHAR NOT NULL,
            "us_is_active" BOOLEAN NOT NULL DEFAULT true,
            "us_created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "us_updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
