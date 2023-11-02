import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { ICreateUserInput } from './interface/create.user.input.interface';
import { IGetUserOutput } from './interface/get.user.output.interface';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    /**
     * Create user.
     * 
     * @param user 
     * @returns 
     */
    async create(createUser: CreateUserDto): Promise<IGetUserOutput> {
        const { firstName, lastName } = createUser;

        const user: ICreateUserInput = {
            firstName,
            lastName
        }

        const newuser = this.userRepository.create(user);
        return this.userRepository.save(newuser);
    }

    /**
     * Get user by userId.
     * 
     * @param userId 
     */
    async get(userId: number): Promise<boolean> {
        const user = await this.userRepository.exist({ where: { id: userId }});
        return user ? true : false;
    }
}
