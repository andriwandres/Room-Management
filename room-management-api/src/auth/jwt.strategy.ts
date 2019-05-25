import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto, User } from './user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: 'J36WN99F3vl6rCLI1smo',
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
