import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Пользователи')
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({summary: 'Получение списка пользователей'})
    @ApiResponse({status: 200, type: CreateUserDto})
    @Get()
    async getAllUsers(): Promise<User[]>{
        const users = await this.userService.getUsers();
        return users;
    }

    @ApiOperation({summary: "Создание пользователей"})
    @ApiResponse({status: 200, type: CreateUserDto})
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<User>{
        const user = await this.userService.createUser(dto);
        return user;
    }
}