import { Module } from "@nestjs/common";
import { ChangePasswordController } from "./change-password.controller";
import { ChangePasswordService } from "./change-password.service";
import { User, UserSchema } from "../users/entities/users.entity";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService, UsersService],
})
export class ChangePasswordModule {}
