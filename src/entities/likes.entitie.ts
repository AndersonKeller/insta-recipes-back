import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipes.entitie";
import { User } from "./user.entitie";

@Entity("likes")
class Likes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.likes)
  recipe: Recipe;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}

export { Likes };
