import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entitie";
import { RecipeIngredient } from "./recipesIngredientes.entitie";

import { CommentsRecipes } from "./commentsRecipes.entitie";

@Entity("recipes")
class Recipe {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 52 })
  name: string;
  @Column({ type: "varchar", nullable: true })
  description: string | null;
  @Column()
  preparationMode: string;
  @Column({ type: "int" })
  minutes: number;
  @Column({ type: "int" })
  rendimentPortions: number;
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => RecipeIngredient,
    (reciepingredient) => reciepingredient.recipe
  )
  @JoinColumn()
  recipesIngredients: RecipeIngredient[];

  @OneToMany(() => CommentsRecipes, (commentsrecipes) => commentsrecipes.recipe)
  @JoinColumn()
  commentsRecipe: CommentsRecipes[];
}
export { Recipe };
