// src/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ select: false }) // Important: le mot de passe n'est jamais retourné par défaut
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TECH })
  role: UserRole;

  // Hook TypeORM: appelé juste avant d'insérer l'utilisateur
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      // Hachage avec un 'salt' (niveau de complexité) de 10
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Méthode utilitaire pour vérifier le mot de passe lors de la connexion
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}