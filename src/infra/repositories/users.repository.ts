/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

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
      console.log(error.message);
      throw new Error("Could not create a new user!")
    }
  }
}
