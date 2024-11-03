import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsTable1730631454899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "notifications" (
                no_id VARCHAR PRIMARY KEY,
                no_message_id VARCHAR REFERENCES messages(me_id),
                no_receiver_id VARCHAR REFERENCES users(us_id),
                no_created_at TIMESTAMP NOT NULL DEFAULT now()
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"`);
  }
}
