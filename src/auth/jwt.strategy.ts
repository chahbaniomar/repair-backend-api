import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY_123', // DOIT être la même que dans auth.module.ts
    });
  }

  async validate(payload: any) {
    // Ce que tu renvoies ici sera disponible dans 'req.user'
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}