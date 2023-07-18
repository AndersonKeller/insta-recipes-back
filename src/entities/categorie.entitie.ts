import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipes.entitie";

@Entity("categories")
class Categories {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 52 })
  name: string;
  @OneToMany(() => Recipe, (recipe) => recipe.categorie)
  recipe: Recipe[];
}
export { Categories };
