import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1662112663907 implements MigrationInterface {
    name = 'migration1662112663907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification_notification_status_enum" AS ENUM('read', 'unread')`);
        await queryRunner.query(`CREATE TYPE "public"."notification_notification_importance_enum" AS ENUM('urgent_and_important', 'not_urgent_and_important', 'not_urgent_not_important')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "notification_title" character varying, "notification_detail" character varying NOT NULL, "notification_status" "public"."notification_notification_status_enum" NOT NULL DEFAULT 'unread', "notification_importance" "public"."notification_notification_importance_enum" NOT NULL DEFAULT 'not_urgent_not_important', CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_notification_importance_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notification_notification_status_enum"`);
    }

}
