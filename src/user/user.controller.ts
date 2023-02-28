import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { Patch, Post, Put } from '@nestjs/common';

import { CreateUserEntity } from './entities/user.entity';
import { UpdatePutUserEntity } from './entities/update-put-user.entity';
import { UpdatePatchUserEntity } from './entities/update-patch-user.entity';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() createEntity: CreateUserEntity) {
    return createEntity;
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { users: {}, id };
  }

  @Put(':id')
  async update(
    @Body() updatePutUserEntity: UpdatePutUserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'PUT',
      updatePutUserEntity,
      id,
    };
  }

  @Patch(':id')
  async partialUpdate(
    @Body() updatePatchUserEntity: UpdatePatchUserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'PATCH',
      updatePatchUserEntity,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
