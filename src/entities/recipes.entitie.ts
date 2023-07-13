import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entitie";

@Entity("recipes")
class Recipe {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 52 })
  name: string;
  @Column({ type: "varchar", nullable: true })
  description: string | null;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
export { Recipe };
