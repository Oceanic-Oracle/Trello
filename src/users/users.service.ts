import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUsers(): Promise<User[]> {
        const users = await this.prismaService.user.findMany();
        return users;
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.prismaService.user.create({data: { login:dto.login, password:dto.password}});
        return user;
    }
}