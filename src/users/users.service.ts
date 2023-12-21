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
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async updateUser(data: User, id: string): Promise<User> {
    await this.userRepository.update(id, data);
    return await this.userRepository.findOne({ where: { id: +id } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
