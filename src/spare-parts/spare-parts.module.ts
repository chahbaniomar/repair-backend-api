import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './spare-part.entity';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  providers: [SparePartsService],
  controllers: [SparePartsController],
})
export class SparePartsModule {}