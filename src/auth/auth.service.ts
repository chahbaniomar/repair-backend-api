import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { UserRole } from '../users/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
      role: UserRole.TECH, // Par défaut selon le sujet
    });

    return await this.userRepository.save(newUser);
  }
}