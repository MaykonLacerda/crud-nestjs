import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { hash } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create({ name, email, password }: CreateUserDto): Promise<void> {
    const passwordHash = await hash(password, 10);
    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.list();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
