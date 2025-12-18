import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { Intervention } from './intervention.entity';
import { Device } from '../devices/device.entity';
import { SparePart } from '../spare-parts/spare-part.entity';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
    @InjectRepository(Device) private deviceRepo: Repository<Device>,
    @InjectRepository(SparePart) private partRepo: Repository<SparePart>,
    private dataSource: DataSource, // Pour la transaction
  ) {}

  async create(data: any, user: any) {
    const { deviceId, description, partIds } = data;

    // 1. Vérifier si le device existe
    const device = await this.deviceRepo.findOneBy({ id: deviceId });
    if (!device) throw new NotFoundException('Appareil non trouvé');

    // 2. Lancer une transaction pour assurer la cohérence (Etape 2 du sujet)
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Vérifier et récupérer les pièces
      const parts = await this.partRepo.findBy({ id: In(partIds || []) });
      
      for (const part of parts) {
        if (part.stockQuantity < 1) {
          throw new BadRequestException(`Stock insuffisant pour la pièce: ${part.name}`);
        }
        part.stockQuantity -= 1;
        await queryRunner.manager.save(part); // Décrémenter stock
      }

      // Mettre à jour le statut du Device (Etape 3 du sujet)
      device.status = 'REPAIRING';
      await queryRunner.manager.save(device);

      // Créer l'intervention
      const intervention = this.interventionRepo.create({
        description,
        technician: { id: user.userId } as any,
        device: device,
        parts: parts,
      });

      const savedIntervention = await queryRunner.manager.save(intervention);
      
      await queryRunner.commitTransaction();
      return savedIntervention;

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}