import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { User, UserDto } from './user.entity';
import { UserService } from './user.service';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUsers')
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('getUser/:id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDto: UserDto): Promise<boolean> {
    return this.userService.login(userDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  async register(@Body() userDto: UserDto): Promise<User> {
    const user = await this.userService.register(userDto);

    if (!user) {
      throw new BadRequestException('email is already taken');
    }

    return user;
  }
}
