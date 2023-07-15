import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveEnumType1689379313420 implements MigrationInterface {
    name = 'RemoveEnumType1689379313420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP COLUMN "quantityType"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_ingredients_quantitytype_enum"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD "quantityType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP COLUMN "quantityType"`);
        await queryRunner.query(`CREATE TYPE "public"."recipe_ingredients_quantitytype_enum" AS ENUM('ml', 'kg', 'unid')`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD "quantityType" "public"."recipe_ingredients_quantitytype_enum" NOT NULL`);
    }

}
