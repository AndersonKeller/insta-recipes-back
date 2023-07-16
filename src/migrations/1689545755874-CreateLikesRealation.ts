import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikesRealation1689545755874 implements MigrationInterface {
    name = 'CreateLikesRealation1689545755874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_2148e9a8f6fc236d4ac9606431f"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "UQ_2148e9a8f6fc236d4ac9606431f"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "ratingId"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "recipeId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_52e568d130cc658fc17c9dd00ff" UNIQUE ("recipeId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_52e568d130cc658fc17c9dd00ff"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "recipeId"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "ratingId" integer`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "UQ_2148e9a8f6fc236d4ac9606431f" UNIQUE ("ratingId")`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_2148e9a8f6fc236d4ac9606431f" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
