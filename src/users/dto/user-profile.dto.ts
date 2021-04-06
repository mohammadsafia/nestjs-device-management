import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UserProfileDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name',
    default: ''
  })
  name: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The username',
    default: ''
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The password',
    default: ''
  })
  email: string;
}
