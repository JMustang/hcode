import { PrismaService } from './../prisma/prisma.service';
import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { AuthRegisterEntity } from './entities/auth-register.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  crateToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: `Email or password is incorrect.`,
      });
    }
    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException({
        message: `Email or password is incorrect.`,
      });
    }

    return this.crateToken(user);
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: `Incorrect email.`,
      });
    }
    return true;
  }
  async reset(password: string, token: string) {
    // TODO: Validations token
    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return this.crateToken(user);
  }

  async register(data: AuthRegisterEntity) {
    const user = await this.userService.create(data);

    return this.crateToken(user);
  }
}
