import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Likes } from "./likes.entitie";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
  @Column({ length: 45, unique: true })
  email: string;
  @Column({ default: false })
  admin: boolean;
  @Column({ length: 120 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 9);
    }
  }
  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];
}

export { User };
