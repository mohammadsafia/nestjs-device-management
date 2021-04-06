import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("api/auth/forgot-password")
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {
  }

  @Post()
  public async forgotPassword(@Res() res, @Body() forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    try {
      await this.forgotPasswordService.forgotPassword(forgotPasswordDto);

      return res.status(HttpStatus.OK).json({
        message: "Request Reset Password Successfully!",
        status: HttpStatus.OK
      });
    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: Forgot password failed!",
        status: HttpStatus.OK
      });
    }
  }
}
