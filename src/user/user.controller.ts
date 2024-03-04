import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: Prisma.UserCreateInput) {
        return this.userService.create(createUserDto);
    }

    @SkipThrottle({ default: false })
    @Get()
    findAll(@Query('role') role?: 'NOOB' | 'NORMAL' | 'ADMIN') {
        return this.userService.findAll(role);
    }

    @Throttle({ short: { ttl: 1000, limit: 2 } })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: Prisma.UserUpdateInput
    ) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
