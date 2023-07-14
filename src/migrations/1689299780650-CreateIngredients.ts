import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredients1689299780650 implements MigrationInterface {
    name = 'CreateIngredients1689299780650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."recipe_ingredients_quantitytype_enum" AS ENUM('ml', 'kg', 'unid')`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD "quantityType" "public"."recipe_ingredients_quantitytype_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP COLUMN "quantityType"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_ingredients_quantitytype_enum"`);
    }

}
