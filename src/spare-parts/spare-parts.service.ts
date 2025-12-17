import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './spare-part.entity';

@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
  ) {}

  // Créer une nouvelle pièce
  create(data: Partial<SparePart>) {
    const newPart = this.sparePartRepository.create(data);
    return this.sparePartRepository.save(newPart);
  }

  // Voir toutes les pièces
  findAll() {
    return this.sparePartRepository.find();
  }
}