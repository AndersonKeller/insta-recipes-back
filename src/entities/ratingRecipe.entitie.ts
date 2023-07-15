import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./recipes.entitie";

@Entity("rating")
class Rating {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  rating: number;

  @OneToOne(() => Recipe)
  @JoinColumn()
  recipe: Recipe;
}
export { Rating };
