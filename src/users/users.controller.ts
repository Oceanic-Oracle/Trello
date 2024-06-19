import { Controller, Get } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "@prisma/client";

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return this.userService.getUsers();
    }
}