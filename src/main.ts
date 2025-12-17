import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Ajoute cet import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Cette ligne permet d'activer la validation automatique !
  app.useGlobalPipes(new ValidationPipe()); 
  
  await app.listen(3000);
}
bootstrap();