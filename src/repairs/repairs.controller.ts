import { Controller, Post, Body, UseGuards, Request, InternalServerErrorException } from '@nestjs/common';
import { RepairsService } from './repairs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('repairs')
export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() repairData: any, @Request() req: any) {
    try {
      // On attend la réponse du service
      const repair = await this.repairsService.createRepair(repairData, req.user);

      // On renvoie un objet propre pour éviter les erreurs de format (Circular JSON)
      return {
        message: 'Réparation créée avec succès !',
        id: repair.id,
        client: repair.clientName,
        totalPrice: repair.totalPrice,
        status: repair.status
      };
    } catch (error) {
      // Si ça plante, on affiche l'erreur réelle dans le terminal
      console.error('Erreur lors de la création:', error);
      
      // On renvoie un message d'erreur plus clair au client
      throw new InternalServerErrorException({
        message: "Erreur lors de la création de la réparation",
        detail: error.message
      });
    }
  }
}