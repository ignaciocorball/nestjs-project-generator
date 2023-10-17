import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthCredentialsDto {
  email: string;
  password: string;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;
}