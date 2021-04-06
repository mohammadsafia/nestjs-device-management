import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ChangePasswordService } from "./change-password.service";
import { AuthGuard } from "@nestjs/passport";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@Controller("api/auth/change-password")
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {
  }

  @Post()
  public async changePassword(@Res() res, @Body() changePasswordDto: ChangePasswordDto): Promise<any> {
    try {
      await this.changePasswordService.changePassword(changePasswordDto);

      return res.status(HttpStatus.OK).json({
        message: "Request Change Password Successfully!",
        status: HttpStatus.OK
      });
    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: Change password failed!",
        status: HttpStatus.BAD_REQUEST
      });
    }
  }
}
