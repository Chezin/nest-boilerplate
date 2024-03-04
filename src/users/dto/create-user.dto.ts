import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['NOOB', 'NORMAL', 'ADMIN'], {
        message: 'Valid role required'
    })
    role: 'NOOB' | 'NORMAL' | 'ADMIN';
}
