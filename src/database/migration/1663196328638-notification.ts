import { MigrationInterface, QueryRunner } from "typeorm";

export class notification1663196328638 implements MigrationInterface {
    name = 'notification1663196328638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification_notification_status_enum" AS ENUM('read', 'unread')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "notification_title" character varying, "notification_detail" character varying NOT NULL, "notification_status" "public"."notification_notification_status_enum" NOT NULL DEFAULT 'unread', "developer_id" character varying NOT NULL, "event_id" character varying NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_notification_status_enum"`);
    }

}
