import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User, UserDto } from './user.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  async signin(@Body() userDto: UserDto): Promise<string> {
    const token = await this.authService.login(userDto);

    if (!token) {
      throw new BadRequestException('invalid user credentials');
    }

    return token;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  async register(@Body() userDto: UserDto): Promise<User> {
    const user = await this.authService.register(userDto);

    if (!user) {
      throw new BadRequestException('email is already taken');
    }

    return user;
  }
}
