import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDto } from './user.entity';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async getUsers(): Promise<User[]> {
    return await this.repository.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }

  async login(userDto: UserDto): Promise<boolean> {
    const { email, password } = userDto;
    const user = await this.repository.findOne({ email });

    if (!!user) {
      return await bcrypt.compare(password, user.password);
    }

    return false;
  }

  async register(userDto: UserDto): Promise<User> {
    const { email, password } = userDto;
    const emailExists = (await this.repository.findOne({ email }));

    if (emailExists) {
      return null;
    }

    return await bcrypt.hash(password, SALT_ROUNDS).then(hash => {
      userDto.password = hash;

      return this.repository.save(userDto);
    });
  }
}
