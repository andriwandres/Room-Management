import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { UserDto } from './user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly repository: Repository<User>
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async login(userDto: UserDto): Promise<string> {
    const { email, password } = userDto;
    const user = await this.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const validCredentials = await bcrypt.compare(password, user.password);

    if (!validCredentials) {
      return null;
    }

    return this.jwtService.sign(userDto);
  }

  async register(userDto: UserDto): Promise<User> {
    const { email, password } = userDto;
    const emailExists = !!(await this.repository.findOne({ email }));

    if (emailExists) {
      return null;
    }

    return await bcrypt.hash(password, SALT_ROUNDS).then(hash => {
      userDto.password = hash;

      return this.repository.save(userDto);
    });
  }
}
