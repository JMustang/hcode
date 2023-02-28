import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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
  async readOne(@Param() params) {
    return { users: {}, params };
  }

  @Put(':id')
  async update(
    @Body() updatePutUserEntity: UpdatePutUserEntity,
    @Param() params,
  ) {
    return {
      method: 'PUT',
      updatePutUserEntity,
      params,
    };
  }

  @Patch(':id')
  async partialUpdate(
    @Body() updatePatchUserEntity: UpdatePatchUserEntity,
    @Param() params,
  ) {
    return {
      method: 'PATCH',
      updatePatchUserEntity,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      params,
    };
  }
}
