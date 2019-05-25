import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto, User } from './user.entity';
import { AuthService } from './auth.service';
import { JWT_SECRET } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(userDto: UserDto): Promise<User> {
    const user = await this.authService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
