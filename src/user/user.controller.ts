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
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() request: CreateUserEntity) {
    return this.userService.create(request);
  }

  @Get()
  async readAll() {
    return this.userService.readAll();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id);
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
