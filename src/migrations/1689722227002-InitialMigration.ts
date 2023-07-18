import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689722227002 implements MigrationInterface {
    name = 'InitialMigration1689722227002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(52) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "categorieId" integer`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_869ecde925c5989a47cd4feb75e" FOREIGN KEY ("categorieId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_869ecde925c5989a47cd4feb75e"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "categorieId"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
