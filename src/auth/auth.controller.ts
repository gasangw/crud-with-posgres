import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDetailDto } from 'src/users/dtos/userDetail.dto';
import { NewUserDto } from 'src/users/dtos/newUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(user: NewUserDto): Promise<UserDetailDto | any> {
    return await this.authService.register(user);
  }
}
