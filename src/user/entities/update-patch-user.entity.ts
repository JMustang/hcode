import { CreateUserEntity } from './user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchUserEntity extends PartialType(CreateUserEntity) {}
