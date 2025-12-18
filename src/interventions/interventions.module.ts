import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './intervention.entity';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Device } from '../devices/device.entity';
import { SparePart } from '../spare-parts/spare-part.entity';

@Module({
  imports: [
    // On déclare les 3 entités dont on a besoin pour la transaction
    TypeOrmModule.forFeature([Intervention, Device, SparePart])
  ],
  providers: [InterventionsService],
  controllers: [InterventionsController],
})
export class InterventionsModule {}