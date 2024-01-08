import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { User } from 'src/users/user.entity';
import { ExistingUserDto } from 'src/users/dtos/existingUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: NewUserDto): Promise<User[] | any> {
    return await this.authService.register(user);
  }

  @Post('signin')
  async signin(@Body() user: ExistingUserDto) {
    return await this.authService.signin(user);
  }
}
