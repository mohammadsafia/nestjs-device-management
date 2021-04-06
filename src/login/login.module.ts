import { Module } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginController } from "./login.controller";
import { User, UserSchema } from "../users/entities/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secret: "Terkwaz@2020",
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  providers: [LoginService, UsersService, JwtStrategy],
  controllers: [LoginController]
})
export class LoginModule {}
