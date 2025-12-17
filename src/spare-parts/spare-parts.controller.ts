import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SparePartsService } from './spare-parts.service';
import { AuthGuard } from '@nestjs/passport'; // On utilisera un guard plus tard, pour l'instant restons simple

@Controller('spare-parts')
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: any) {
    return this.sparePartsService.create(data);
  }

  @Get()
  findAll() {
    return this.sparePartsService.findAll();
  }
}