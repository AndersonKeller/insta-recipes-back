import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./comments.entitie";
import { Recipe } from "./recipes.entitie";

@Entity("comments_recipes")
class CommentsRecipes {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @ManyToOne(() => Comments, (comments) => comments.commentsRecipe)
  comments: Comments;
  @ManyToOne(() => Recipe, (recipe) => recipe.commentsRecipe)
  recipe: Recipe;
}
export { CommentsRecipes };
