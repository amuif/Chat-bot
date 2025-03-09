import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  username:string; 

  @IsEmail()
  email:string;

  @IsStrongPassword()
  password:string;
}
