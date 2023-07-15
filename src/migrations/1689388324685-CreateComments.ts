import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComments1689388324685 implements MigrationInterface {
    name = 'CreateComments1689388324685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments_recipes" ("id" SERIAL NOT NULL, "commentsId" integer, "recipeId" integer, CONSTRAINT "PK_2c0f1ec23d04fba59e3e37c8472" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments_recipes" ADD CONSTRAINT "FK_e4de967b6d09d3758229d2e9a3b" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_recipes" ADD CONSTRAINT "FK_361673372952d1025887a434b4f" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_recipes" DROP CONSTRAINT "FK_361673372952d1025887a434b4f"`);
        await queryRunner.query(`ALTER TABLE "comments_recipes" DROP CONSTRAINT "FK_e4de967b6d09d3758229d2e9a3b"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "comments_recipes"`);
    }

}
