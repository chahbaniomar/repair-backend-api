// src/dtos/register-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  username: string;

  @IsEmail({}, { message: "L'email doit être valide" })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: "Le mot de passe doit faire au moins 6 caractères" })
  password: string;
}