import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDetailDto } from './dtos/userDetail.dto';
import { NewUserDto } from './dtos/newUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserDetailDto(user: UserDetailDto): UserDetailDto {
    const { id, name, email } = user;
    return { id, name, email };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User[]> {
    const user = await this.userRepository.find({
      where: { id: +id },
    });
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(user: NewUserDto): Promise<UserDetailDto> {
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
