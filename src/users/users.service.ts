import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    //connect to database here ideally
    private users = [
        {
            id: 1,
            name: 'Anskel Camsel',
            email: 'ansken@abc.com',
            role: 'NOOB'
        },
        {
            id: 2,
            name: 'Anskel Casldkamsel',
            email: 'ansksdkgn@abc.com',
            role: 'NORMAL'
        },
        {
            id: 3,
            name: 'Anskesdfgl Camsel',
            email: '1asfdkansken@abc.com',
            role: 'ADMIN'
        }
    ];

    findAll(role?: 'NOOB' | 'NORMAL' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter((user) => user.role === role);
            if (!rolesArray.length)
                throw new NotFoundException('User role not found');
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    create(createUserDTO: CreateUserDTO) {
        const usersById = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersById[0].id + 1,
            ...createUserDTO
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDTO: UpdateUserDTO) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return { ...user, ...updateUserDTO };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter((user) => user.id !== id);

        return removedUser;
    }
}
