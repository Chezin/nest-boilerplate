import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

// This makes so the types on UpdateUser are optional
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
