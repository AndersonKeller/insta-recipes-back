import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689562064435 implements MigrationInterface {
    name = 'InitialMigration1689562064435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "recipeId" integer, CONSTRAINT "REL_52e568d130cc658fc17c9dd00f" UNIQUE ("recipeId"), CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
