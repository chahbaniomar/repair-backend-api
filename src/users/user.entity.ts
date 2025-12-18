import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/user-role.enum';
import { Intervention } from '../interventions/intervention.entity'; // On va le créer juste après

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ select: false }) 
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TECH })
  role: UserRole;

  // Relation : Un User peut réaliser plusieurs Interventions 
  @OneToMany(() => Intervention, (intervention) => intervention.technician)
  interventions: Intervention[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}