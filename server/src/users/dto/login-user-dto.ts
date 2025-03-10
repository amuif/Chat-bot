import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  // @IsString()
  // @IsNotEmpty()
  // username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  password:string


}
