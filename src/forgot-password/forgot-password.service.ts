import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/users.entity";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly mailerService: MailerService
  ) {
  }

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const userUpdate = await this.userModel.findOne({
      email: forgotPasswordDto.email
    });
    const passwordRand = Math.random().toString(36).slice(-8);
    userUpdate.password = bcrypt.hashSync(passwordRand, 8);

    this.sendMailForgotPassword(userUpdate.email, passwordRand);

    return await userUpdate.save();
  }

  private sendMailForgotPassword(email, password): void {
    this.mailerService.sendMail({
      to: email,
      from: "from@example.com",
      subject: "Forgot Password successful ✔",
      text: "Forgot Password successful!",
      template: "index",
      context: {
        title: "Forgot Password successful!",
        description:
          "Request Reset Password Successfully!  ✔, This is your new password: " +
          password
      }
    }).then(response => {
      console.log(response);
      console.log("Forgot Password: Send Mail successfully!");
    }).catch(err => {
      console.log(err);
      console.log("Forgot Password: Send Mail Failed!");
    });
  }
}
