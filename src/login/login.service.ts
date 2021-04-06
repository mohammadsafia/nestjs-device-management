import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { IUsers } from '../users/interfaces/users.interface';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(loginDto: LoginDto): Promise<IUsers> {
    return await this.usersService.findByEmail(loginDto.email);
  }

  public async login(loginDto: LoginDto,): Promise<any | { status: number; message: string }> {
    return this.validate(loginDto).then(userData => {
      if (!userData) {
        throw new UnauthorizedException();
      }

      const passwordIsValid = bcrypt.compareSync(loginDto.password, userData.password,);

      if (!passwordIsValid == true) {
        return {
          message: 'Authentication failed. Wrong password',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const payload = { name: userData.name, email: userData.email};

      const accessToken = this.jwtService.sign(payload);

      return {
        expiresIn: 3600,
        accessToken: accessToken,
        user: payload,
        status: HttpStatus.OK,
      };
    });
  }

  public async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  protected createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}
