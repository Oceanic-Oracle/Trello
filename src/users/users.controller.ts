import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteUserDto } from "./dto/delete-user.dto";

@ApiTags('Управление пользователями')
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

    @ApiOperation({summary: "Удаление пользователя"})
    @ApiResponse({status: 200, type: DeleteUserDto})
    @Delete()
    async deleteUser(@Body() dto: DeleteUserDto) {
        const user = await this.userService.deleteUser(dto);
        return user;
    }
}