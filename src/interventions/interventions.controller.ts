import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('interventions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @Post()
  @Roles('TECH') // Un Manager ne peut pas créer une intervention (Règle Module 4)
  create(@Body() data: any, @Request() req: any) {
    return this.interventionsService.create(data, req.user);
  }
}