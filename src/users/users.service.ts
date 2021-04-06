import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { IUsers } from "./interfaces/users.interface";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcryptjs";
import { UserProfileDto } from "./dto/user-profile.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User ${ email } not found`);
    }

    return user;
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId, ' -password');

    if (!user) {
      throw new NotFoundException(`User #${ userId } not found`);
    }

    return user;
  }

  public async create(userDto: UserDto): Promise<IUsers> {
    try {
      const user = await new this.userModel(userDto);
      return user.save();
    }
    catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByPassword(email: string, password: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      user.password = bcrypt.hashSync(password, 8);

      return await user.save();
    }
    catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

  }

  public async updateProfileUser(id: string, userProfileDto: UserProfileDto): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      user.name = userProfileDto.name;
      user.email = userProfileDto.email;
      user.username = userProfileDto.username;

      return await user.save();
    }
    catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
