import { Module } from "@nestjs/common";
import { RegisterController } from "./register.controller";
import { RegisterService } from "./register.service";
import { UsersService } from "../users/users.service";
import { User, UserSchema } from "../users/entities/users.entity";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [RegisterController],
  providers: [RegisterService, UsersService]
})
export class RegisterModule {}
