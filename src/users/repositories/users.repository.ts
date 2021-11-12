/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create({name, email, password}: User): Promise<void> {
    try {
      const newUser = this.userRepository.create({name, email, password});
      await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error.message);
      throw new Error("Could not create a new user!")
    }
  }

  async list(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, data: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update({id}, data);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
