import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    type: String,
    description: 'The name',
    default: ''
  })
  readonly name: string;

  @IsString()
  @MaxLength(40)
  @ApiProperty({
    type: String,
    description: 'The username',
    default: ''
  })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'The email',
    default: ''
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    type: String,
    description: 'The password',
    default: ''
  })
  password: string;
}
