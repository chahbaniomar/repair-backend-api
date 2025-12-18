import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { SparePart } from '../spare-parts/spare-part.entity';

@Entity('repairs')
export class Repair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column()
  deviceModel: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  technician: User;

  @ManyToMany(() => SparePart)
  @JoinTable()
  parts: SparePart[];
}