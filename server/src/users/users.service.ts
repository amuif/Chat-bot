import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export type User = {
  _id: string;
  username: string;
  password: string;
};

// export const users: User[] = [
//   { _id: "1", username: "john_doe", password: "password123" },
//   { _id: "2", username: "jane_smith", password: "securePass!" },
//   { _id: "3", username: "alex_brown", password: "alex@789" },
//   { _id: "4", username: "emily_jones", password: "emilyPass45" },
//   { _id: "5", username: "michael_white", password: "mike$pass" },
//   { _id: "6", username: "sarah_clark", password: "sarah2024" },
//   { _id: "7", username: "david_wilson", password: "david_123" },
//   { _id: "8", username: "olivia_martin", password: "martin@pass" },
//   { _id: "9", username: "chris_taylor", password: "taylor!456" },
//   { _id: "10", username: "sophia_anderson", password: "anderson_007" },
// ];
@Injectable()
export class UsersService {
  constructor(private readonly databaseModule: DatabaseService) {}

  // post
  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseModule.user.create({ data: createUserDto });
  }
  // get
  async findAll() {
    return this.databaseModule.user.findMany();
  }
  //get (:id)
  async findOne(id: number) {
    return this.databaseModule.user.findUnique({ where: { id } });
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
}
