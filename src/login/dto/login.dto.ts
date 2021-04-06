import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
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
  readonly password: string;
}
