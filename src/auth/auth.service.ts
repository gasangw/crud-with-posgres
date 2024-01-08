import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private UserService: UsersService) {}

  // async hashedPassword(password: string): Promise<string> {
  //   return await bcrypt.hash(password, 12);
  // }

  async register(user: NewUserDto): Promise<User[] | any> {
    // check if the email is in use
    const existingUser = await this.UserService.findOneByEmail(user.email);
    if (existingUser) throw new BadRequestException('Email is in use');
    // hash the password
    // create a salt
    const salt = await bcrypt.genSalt();
    // hash the password with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    // join the hashed password and the salt together
    const hashedPasswordWithSalt = `${hashedPassword}.${salt}`;
    // save the password
    // create the user and save them
    const newUser = await this.UserService.create({
      ...user,
      password: hashedPasswordWithSalt,
    });
    return newUser;
  }

  signin() {}
}
