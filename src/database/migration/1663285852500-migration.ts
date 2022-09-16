import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1663285852500 implements MigrationInterface {
    name = 'migration1663285852500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "event_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ADD "event_id" character varying NOT NULL`);
    }

}
