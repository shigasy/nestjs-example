import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTest2ToMemo1612807249719 implements MigrationInterface {
  name = 'addTest2ToMemo1612807249719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_memo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "test" text NOT NULL, "test2" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_memo"("id", "name", "description", "test") SELECT "id", "name", "description", "test" FROM "memo"`,
    );
    await queryRunner.query(`DROP TABLE "memo"`);
    await queryRunner.query(`ALTER TABLE "temporary_memo" RENAME TO "memo"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "memo" RENAME TO "temporary_memo"`);
    await queryRunner.query(
      `CREATE TABLE "memo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "test" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "memo"("id", "name", "description", "test") SELECT "id", "name", "description", "test" FROM "temporary_memo"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_memo"`);
  }
}
