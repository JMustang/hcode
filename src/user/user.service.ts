import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Method POST
  async create({ email, name, password }: CreateUserEntity) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  // Method GET
  async readAll() {
    return this.prisma.user.findMany();
  }

  async readOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
