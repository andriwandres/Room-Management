import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User, UserDto } from './user.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ title: 'Checks user credentials and returns an access token' })
  @ApiOkResponse({ description: 'Access was successful, access token is returned' })
  @ApiBadRequestResponse({ description: 'User credentials were invalid' })
  async login(@Body() userDto: UserDto): Promise<string> {
    const token = await this.authService.login(userDto);

    if (!token) {
      throw new BadRequestException('Invalid user credentials');
    }

    return token;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ title: 'Creates a new user in the database' })
  @ApiCreatedResponse({ description: 'New user was created, access token is returned' })
  @ApiBadRequestResponse({ description: 'New email is already taken by another user' })
  async register(@Body() userDto: UserDto): Promise<User> {
    const user = await this.authService.register(userDto);

    if (!user) {
      throw new BadRequestException('Email is already taken');
    }

    return user;
  }
}
