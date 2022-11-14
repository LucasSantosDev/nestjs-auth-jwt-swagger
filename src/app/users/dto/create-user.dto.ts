import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'Lucas' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Dev' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email', example: 'lucas@live.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', example: '@Senha123' })
  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}
