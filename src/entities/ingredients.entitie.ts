import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeIngredient } from "./recipesIngredientes.entitie";

@Entity("ingredients")
class Ingredient {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 52 })
  name: string;
  @OneToMany(
    () => RecipeIngredient,
    (recipeingredient) => recipeingredient.ingredient
  )
  recipesIngredients: RecipeIngredient[];
}
export { Ingredient };
