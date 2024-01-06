import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { UserDetailDto } from 'src/users/dtos/userDetail.dto';
import { UsersService } from 'src/users/users.service';
import { Post } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private UserService: UsersService) {}

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  @Post('register')
  async register(user: NewUserDto): Promise<UserDetailDto | any> {
    const existingUser = await this.UserService.findOneByEmail(user.email);
    if (existingUser) return 'User already exists';

    const hashedPassword = await this.hashedPassword(user.password);
    const newUser = await this.UserService.create({
      ...user,
      password: hashedPassword,
    });
    return this.UserService.getUserDetailDto(newUser);
  }
}
