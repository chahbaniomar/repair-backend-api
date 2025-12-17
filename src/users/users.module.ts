// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Enregistre l'Entité User
  providers: [UsersService],
  // Nous n'avons pas besoin de UsersController pour l'instant (il sera géré par AuthController)
  // controllers: [UsersController], 
  exports: [UsersService, TypeOrmModule.forFeature([User])], // Exportez le Service et le Repository
})
export class UsersModule {}