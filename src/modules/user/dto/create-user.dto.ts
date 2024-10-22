import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  idConsultor: number;

  @IsString()
  @IsNotEmpty()
  idJira: string;

  @IsString()
  @IsNotEmpty()
  usuarioWindows: string;
}
