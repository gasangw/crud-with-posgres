import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ExistingUserDto } from 'src/users/dtos/existingUser.dto';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private UserService: UsersService) {}

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

  async signin(user: ExistingUserDto) {
    // check if the email exists
    const existingUser = await this.UserService.findOneByEmail(user.email);
    // throw an error if the email does not exist
    if (!existingUser)
      throw new BadRequestException('Invalid email address provided');
    // compare the password provided with the password in the database
    const existingUserPassword = existingUser.password.split('.')[0];
    const existingUserSalt = existingUser.password.split('.')[1];

    const hashedPassword = await bcrypt.hash(user.password, existingUserSalt);
    if (hashedPassword !== existingUserPassword)
      throw new BadRequestException('Invalid password provided');

    // return the user if the password matches
    return existingUser;
  }
}
