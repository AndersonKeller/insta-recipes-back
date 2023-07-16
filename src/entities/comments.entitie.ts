import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommentsRecipes } from "./commentsRecipes.entitie";
import { User } from "./user.entitie";

@Entity("comments")
class Comments {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => CommentsRecipes,
    (commentsrecipes) => commentsrecipes.comments
  )
  @JoinColumn()
  commentsRecipe: CommentsRecipes[];
}
export { Comments };
