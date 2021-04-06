import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The email',
    default: '',
    required: true
  })
  readonly email: string;
}
