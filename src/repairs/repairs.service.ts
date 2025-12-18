import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Repair } from './repair.entity';
import { SparePart } from '../spare-parts/spare-part.entity';

@Injectable()
export class RepairsService {
  constructor(
    @InjectRepository(Repair) private repairRepo: Repository<Repair>,
    @InjectRepository(SparePart) private partRepo: Repository<SparePart>,
  ) {}

  async createRepair(data: any, user: any) {
    const { clientName, deviceModel, partIds } = data;

    // 1. Récupérer les pièces
    const parts = await this.partRepo.findBy({
      id: In(partIds || []),
    });

    // 2. Calculer le prix et mettre à jour le stock UNIQUEMENT si nécessaire
    let total = 50; // Main d'œuvre
    
    if (parts.length > 0) {
      for (const part of parts) {
        total += Number(part.price);
        
        // On ne décrémente que s'il y a du stock
        if (part.stockQuantity > 0) {
          part.stockQuantity = part.stockQuantity - 1;
          // On sauvegarde la pièce individuellement pour être sûr
          await this.partRepo.save(part); 
        }
      }
    }

    // 3. Créer l'objet réparation
    // ATTENTION : on utilise user.userId car c'est ce qu'on a mis dans la JwtStrategy
    const newRepair = this.repairRepo.create({
      clientName,
      deviceModel,
      totalPrice: total,
      technician: { id: user.userId } as any, // On lie l'ID du technicien
      parts: parts,
    });

    return await this.repairRepo.save(newRepair);
  }
}