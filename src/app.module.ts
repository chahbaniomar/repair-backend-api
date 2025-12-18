// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; // <<< Vérifiez cette ligne
import { AuthModule } from './auth/auth.module';
import { SparePartsModule } from './spare-parts/spare-parts.module';
import { RepairsModule } from './repairs/repairs.module';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root', // <<< MODIFIEZ ICI
      password: '', // <<< MODIFIEZ ICI
      database: 'repair_db', // Le nom de la BDD pour ce projet
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Cherche les entités partout
      synchronize: true, // Laisse à TRUE pour la création automatique des tables en dev
      autoLoadEntities: true, // Charge automatiquement Device, User, etc.
    }),
    UsersModule,
    AuthModule,
    SparePartsModule,
    RepairsModule,
    DevicesModule,
    InterventionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}