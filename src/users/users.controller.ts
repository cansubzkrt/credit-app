import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiBadRequestResponse } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @ApiBadRequestResponse({ status: 400, description: 'When request body validation fails.'})
    @Post()
    async create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }
}
