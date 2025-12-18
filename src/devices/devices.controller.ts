import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('devices')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Protection par Token et par Rôle
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post() // Tout utilisateur connecté 
  create(@Body() data: any) {
    return this.devicesService.create(data);
  }

  @Get() // Tout utilisateur connecté 
  findAll() {
    return this.devicesService.findAll();
  }

  @Delete(':id')
  @Roles('ADMIN') // Seul un admin peut supprimer [cite: 50]
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}