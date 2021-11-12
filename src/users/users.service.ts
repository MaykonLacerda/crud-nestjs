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

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
