import { LoginUserDto } from './dto/login-user-dto';
import { sign } from 'jsonwebtoken';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { userResponseType } from './types/user-response';

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly databaseModule: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const { username, email } = createUserDto;
    const existingUser = await this.databaseModule.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        existingUser?.email === email
          ? 'Email is already taken'
          : 'username is already taken',
      );
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    createUserDto.password = hashedPassword;
    return this.databaseModule.user.create({ data: createUserDto });
  }

  async loginUser(loginDto: LoginUserDto): Promise<userResponseType> {
    const user = await this.databaseModule.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user)
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      user.password as string,
    );

    if (!isPasswordCorrect)
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return this.buildResponseType(user);
  }

  buildResponseType(User: User): userResponseType {
    return {
      id: User.id,
      username: User.username,
      email: User.email,
      token: this.generateJwt(User),
    };
  }
  // generates token
  generateJwt(user: User): string {
    return sign({ email: user.email }, process.env.JWT_SECRET as string);
  }

  // get
  async findAll() {
    return this.databaseModule.user.findMany();
  }
  //get (:id)
  async findOne(username: string) {
    const user = await this.databaseModule.user.findUnique({
      where: { username },
    });
    if (!user)
      throw new NotFoundException(`user with ${username} is not found`);
    return user;
  }
  //gets users by their email
  async findByEmail(email: string): Promise<User> {
    const user = await this.databaseModule.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
  //update user
  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseModule.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  // delete user
  async delete(id: number) {
    return this.databaseModule.user.delete({ where: { id } });
  }

  // get's the user then returns it omitting the password( trying to be safe)
}
