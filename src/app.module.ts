import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";
import { ChangePasswordModule } from "./change-password/change-password.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://MohammadSafia:TAfMtUnAQiFoHJzQ@cluster0.t5cfl.mongodb.net/devicemanagement2?retryWrites=true&w=majority'),
    LoginModule,
    RegisterModule,
    UsersModule,
    ForgotPasswordModule,
    ChangePasswordModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "a9ef0d2e4d8cf6",
            pass: "e55e982f00dc02"
          }
        }
      }),
    }),
  ],
})
export class AppModule {}
