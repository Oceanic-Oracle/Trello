import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUsers(): Promise<User[]> {
        const users = await this.prismaService.user.findMany({
            include: {
                userRoles: {
                    select: {
                        role: {
                            select: {
                                role: true, // Здесь должно быть имя поля из модели Role
                            },
                        },
                    },
                },
            },
        });

        const simplifiedUsers = users.map(user => ({
            id: user.id,
            login: user.login,
            password: user.password,
            roles: user.userRoles.map(userRole => userRole.role.role),
        }));

        return simplifiedUsers;
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const { login, password, roleID} = dto;

        const user = await this.prismaService.user.create({
            data: {
                login, password,
                userRoles: {
                    create: {
                        role: {
                            connect: {
                                id: roleID
                            }
                        }
                    }
                }}});
        return user;
    }

    async deleteUser(dto: DeleteUserDto): Promise<User> {
        const { login, password } = dto;

        const user = await this.prismaService.user.delete({ where: { login, password }})
        return user;
    }
}