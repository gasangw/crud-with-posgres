import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { UserDetailDto } from 'src/users/dtos/userDetail.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private UserService: UsersService) {}

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async register(user: NewUserDto): Promise<UserDetailDto | any> {
    // check if the email is in use
    const existingUser = await this.UserService.findOneByEmail(user.email);
    if (existingUser) throw new BadRequestException('Email is in use');
    // hash the password
    const hashedPassword = await this.hashedPassword(user.password);
    const newUser = await this.UserService.create({
      ...user,
      password: hashedPassword,
    });
    // create the user and save them
    return this.UserService.getUserDetailDto(newUser);
    // return the user
  }

  signin() {}
}
