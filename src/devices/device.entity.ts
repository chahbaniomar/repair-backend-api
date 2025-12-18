import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from '../interventions/intervention.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'REPAIRING', 'READY'],
    default: 'PENDING',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['A', 'B', 'C', 'NONE'],
    default: 'NONE',
  })
  grade: string;

  // Un appareil peut faire l'objet de plusieurs interventions [cite: 32]
  @OneToMany(() => Intervention, (intervention) => intervention.device)
  interventions: Intervention[];
}