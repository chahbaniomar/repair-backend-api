import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { Device } from '../devices/device.entity';
import { SparePart } from '../spare-parts/spare-part.entity';

@Entity('interventions')
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() // Correspond à 'date' dans le sujet
  date: Date;

  @Column({ type: 'text' }) // Description obligatoire
  description: string;

  @ManyToOne(() => Device, (device) => device.interventions)
  device: Device;

  @ManyToOne(() => User, (user) => user.interventions)
  technician: User;

  @ManyToMany(() => SparePart)
  @JoinTable() // Table de liaison pour le Many-to-Many
  parts: SparePart[];
}