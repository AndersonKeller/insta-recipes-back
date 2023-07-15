import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommentsRecipes } from "./commentsRecipes.entitie";

@Entity("comments")
class Comments {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  comment: string;
  @OneToMany(
    () => CommentsRecipes,
    (commentsrecipes) => commentsrecipes.comments
  )
  @JoinColumn()
  commentsRecipe: CommentsRecipes[];
}
export { Comments };
