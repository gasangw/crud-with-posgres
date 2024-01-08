import { Controller, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { User } from './user.entity';
import { NewUserDto } from './dtos/newUser.dto';

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

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.usersService.findOneByEmail(email);
  }

  @Post()
  async create(@Body() user: NewUserDto) {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    const userExists = await this.usersService.findOne(id);
    if (!userExists) throw new NotFoundException('User does not exist!');
    return this.usersService.updateUser(user, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');
    return this.usersService.remove(id);
  }
}
