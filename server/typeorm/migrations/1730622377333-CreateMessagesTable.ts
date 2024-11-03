import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMessagesTable1730622377333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "messages" (
            me_id VARCHAR PRIMARY KEY,
            me_sender_id VARCHAR REFERENCES users(us_id),
            me_receiver_id VARCHAR REFERENCES users(us_id),
            me_message VARCHAR NOT NULL,
            me_created_at TIMESTAMP NOT NULL DEFAULT now()
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "messages"`);
  }
}
