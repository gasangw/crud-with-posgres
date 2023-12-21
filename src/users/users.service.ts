import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User[]> {
    return await this.userRepository.find({
      where: { id: +id },
    });
  }

  async create(user: User): Promise<User> {
    const newUser = await this.userRepository.insert(user);
    return this.userRepository.save(newUser);
  }
}
