import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./ingredients.entitie";
import { Recipe } from "./recipes.entitie";

@Entity("recipe_ingredients")
class RecipeIngredient {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "int" })
  quantity: number;
  @Column()
  quantityType: string;
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipesIngredients)
  ingredient: Ingredient;
  @ManyToOne(() => Recipe, (recipe) => recipe.recipesIngredients)
  recipe: Recipe;
}

export { RecipeIngredient };
