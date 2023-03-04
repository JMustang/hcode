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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserEntity } from './entities/user.entity';
import { UpdatePutUserEntity } from './entities/update-put-user.entity';
import { UpdatePatchUserEntity } from './entities/update-patch-user.entity';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@UseInterceptors(LogInterceptor)
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
    return this.userService.update(id, updatePutUserEntity);
  }

  @Patch(':id')
  async partialUpdate(
    @Body() updatePatchUserEntity: UpdatePatchUserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.partialUpdate(id, updatePatchUserEntity);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
