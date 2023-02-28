import {
  Body,
  Controller,
  Delete,
  Get,
  Param,

  ParseIntPipe,


  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserEntity } from './entities/user.entity';
import { UpdatePutUserEntity } from './entities/update-put-user.entity';
import { UpdatePatchUserEntity } from './entities/update-patch-user.entity';
=======


@Controller('users')
export class UserController {
  @Post()

  async create(@Body() createEntity: CreateUserEntity) {
    return createEntity;
=======
  async create(@Body() body) {
    return body;

  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')

  async readOne(@Param() @Param('id', ParseIntPipe) id: number) {
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

  async readOne(@Param() params) {
    return { users: {}, params };
  }

  @Put(':id')
  async update(@Body() body, @Param() params) {
    return {
      method: 'PUT',
      body,
      params,

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

  async partialUpdate(@Body() body, @Param() params) {
    return {
      method: 'PATCH',
      body,
      params,

    };
  }

  @Delete(':id')

  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id,

  async delete(@Param() params) {
    return {
      params,

    };
  }
}
