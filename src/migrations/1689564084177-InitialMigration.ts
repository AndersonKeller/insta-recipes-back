import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689564084177 implements MigrationInterface {
    name = 'InitialMigration1689564084177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying(52) NOT NULL, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredients" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "quantityType" character varying NOT NULL, "ingredientId" integer, "recipeId" integer, CONSTRAINT "PK_8f15a314e55970414fc92ffb532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "name" character varying(52) NOT NULL, "description" character varying, "preparationMode" character varying NOT NULL, "minutes" integer NOT NULL, "rendimentPortions" integer NOT NULL, "userId" integer, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "recipeId" integer, "userId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_recipes" ("id" SERIAL NOT NULL, "commentsId" integer, "recipeId" integer, CONSTRAINT "PK_2c0f1ec23d04fba59e3e37c8472" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "recipeId" integer, CONSTRAINT "REL_52e568d130cc658fc17c9dd00f" UNIQUE ("recipeId"), CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_05a2b62604dfd9840f4cda76a93" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_2d7f407ae694e91bb3da1798c61" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_8dee0eb7c083d242cfe2f8a6546" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_recipes" ADD CONSTRAINT "FK_e4de967b6d09d3758229d2e9a3b" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_recipes" ADD CONSTRAINT "FK_361673372952d1025887a434b4f" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff"`);
        await queryRunner.query(`ALTER TABLE "comments_recipes" DROP CONSTRAINT "FK_361673372952d1025887a434b4f"`);
        await queryRunner.query(`ALTER TABLE "comments_recipes" DROP CONSTRAINT "FK_e4de967b6d09d3758229d2e9a3b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_8dee0eb7c083d242cfe2f8a6546"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_2d7f407ae694e91bb3da1798c61"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_05a2b62604dfd9840f4cda76a93"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "comments_recipes"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
