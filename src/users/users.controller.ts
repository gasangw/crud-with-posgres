import { Controller, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  @Post()
  async create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUser(user, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
