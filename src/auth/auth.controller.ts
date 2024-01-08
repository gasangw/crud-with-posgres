import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(user: NewUserDto): Promise<User[] | any> {
    return await this.authService.register(user);
  }
}
