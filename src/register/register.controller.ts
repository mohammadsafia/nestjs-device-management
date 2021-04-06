import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
@ApiTags('Auth')
@Controller('api/auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The user has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credential' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async register(@Res() res, @Body() registerUserDto: RegisterUserDto) {
    try {
      await this.registerService.register(registerUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'User registration successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not registration!',
        status: 400,
      });
    }
  }
}
