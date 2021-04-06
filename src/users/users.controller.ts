import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Put, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { UserProfileDto } from "./dto/user-profile.dto";
import { IUsers } from "./interfaces/users.interface";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@UseGuards(AuthGuard("jwt"))
@Controller("/api/users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get("/:userId/profile")
  @ApiResponse({ status: HttpStatus.OK, description: "The users list has been successfully returned." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "You don't have access" })
  public async getUser(@Res() res, @Param("userId") userId: string): Promise<IUsers> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException("User does not exist!");
    }

    return res.status(HttpStatus.OK).json({
      user: user,
      status: 200
    });
  }

  @Put("/:userId/profile")
  @ApiResponse({ status: HttpStatus.OK, description: "The user has been successfully returned." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "You don't have access" })
  public async updateProfileUser(@Res() res, @Param("userId") userId: string, @Body() userProfileDto: UserProfileDto) {
    try {
      await this.usersService.updateProfileUser(userId, userProfileDto);

      return res.status(HttpStatus.OK).json({
        message: "User Updated successfully!",
        status: 200
      });
    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: User not updated!",
        status: 400
      });
    }
  }
}
