import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request
} from '@nestjs/common';
import {  UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { userResponseType } from './types/user-response';
import { LoginUserDto } from './dto/login-user-dto';
import { ExpressRequest } from 'src/middleware/auth.middleware';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signin")
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    const user = await this.usersService.create(createUserDto);
    return this.usersService.buildResponseType(user);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginUserDto): Promise<userResponseType> {
    const user = await this.usersService.loginUser(loginDto);
    return user;
  }

  @Get()
  async currentUser(@Request() request: ExpressRequest): Promise<userResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.buildResponseType(request.user);
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
