import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('spare_parts')
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // ex: "Écran iPhone 13"

  @Column()
  brand: string; // ex: "Apple"

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stockQuantity: number;
}