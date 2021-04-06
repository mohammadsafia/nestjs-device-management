import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "./dto/login.dto";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "../users/entities/users.entity";

@ApiTags("Auth")
@Controller("api/auth/login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {
  }

  @Post()
  @ApiCreatedResponse({ description: "Logged in successfully", type: User })
  @ApiUnauthorizedResponse({ description: "Invalid credential" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  public async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }
}
