import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserEntity } from './entities/user.entity';
import { UpdatePutUserEntity } from './entities/update-put-user.entity';
import { UpdatePatchUserEntity } from './entities/update-patch-user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Method POST
  async create({ email, name, password, birthAt }: CreateUserEntity) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        birthAt: birthAt ? new Date(birthAt) : null,
        password,
      },
    });
  }

  // Method GET
  async readAll() {
    return this.prisma.user.findMany();
  }

  async readOne(id: number) {
    await this.exist(id);
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt }: UpdatePutUserEntity,
  ) {
    await this.exist(id);

    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }

  async partialUpdate(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserEntity,
  ) {
    await this.exist(id);

    const data: any = {};
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = password;
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.exist(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exist(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`User ${id}, does not exist!`);
    }
  }
}
