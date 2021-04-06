import { Module } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordController } from "./forgot-password.controller";
import { User, UserSchema } from "../users/entities/users.entity";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [ForgotPasswordService, UsersService],
  controllers: [ForgotPasswordController]
})
export class ForgotPasswordModule {}
