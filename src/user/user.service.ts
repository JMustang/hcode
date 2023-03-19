import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserEntity } from './entities/user.entity';
import { UpdatePutUserEntity } from './entities/update-put-user.entity';
import { UpdatePatchUserEntity } from './entities/update-patch-user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Method POST
  async create(data: CreateUserEntity) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data,
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
    { email, name, password, birthAt, role }: UpdatePutUserEntity,
  ) {
    await this.exist(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
      where: {
        id,
      },
    });
  }

  async partialUpdate(
    id: number,
    { email, name, password, birthAt, role }: UpdatePatchUserEntity,
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
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
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
