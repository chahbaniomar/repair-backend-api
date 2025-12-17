import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterUserDto } from '../dtos/register-user.dto'; // Vérifie bien le chemin (../dtos/)
import { UserRole } from '../users/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // --- FONCTION INSCRIPTION ---
async register(registerDto: RegisterUserDto): Promise<User> {
    const { email, username, password } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email déjà utilisé');
    }

    const newUser = this.userRepository.create({
      email,
      username,
      password,
      role: UserRole.TECH,
    });

    const savedUser = await this.userRepository.save(newUser);
    
    // ASTUCE ICI : On extrait le password et on garde le reste dans 'userWithoutPassword'
    const { password: _, ...userWithoutPassword } = savedUser;
    
    return userWithoutPassword as User;
  }
  // --- FONCTION CONNEXION ---
  async login(loginDto: any) {
    const { email, password } = loginDto;

    // 1. Chercher l'utilisateur avec le password
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'username'],
    });

    // 2. Vérification
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // 3. Génération du Token
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}