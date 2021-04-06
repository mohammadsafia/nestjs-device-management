import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    type: String,
    description: 'The name',
    default: '',
    required: true
  })
  readonly name: string;

  @IsString()
  @MaxLength(40)
  @ApiProperty({
    type: String,
    description: 'The username',
    default: '',
    required: true
  })
  readonly username: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'The email',
    default: '',
    required: true
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    type: String,
    description: 'The password',
    default: '',
    required: true
  })
  password: string;
}
