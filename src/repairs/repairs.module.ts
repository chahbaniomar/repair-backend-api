import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from './repair.entity';
import { SparePart } from '../spare-parts/spare-part.entity'; // INDISPENSABLE
import { RepairsService } from './repairs.service';
import { RepairsController } from './repairs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Repair, SparePart])], // On importe les deux !
  providers: [RepairsService],
  controllers: [RepairsController],
})
export class RepairsModule {}