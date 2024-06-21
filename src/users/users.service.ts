import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import * as bcrypt from "bcryptjs";

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
                                role: true,
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
                login: login, 
                password: password,
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
        const dtoId = await this.prismaService.user.findUnique({where: { login: dto.login}});
        const equalPassword = await bcrypt.compare(dto.password, dtoId.password);

        if(dtoId && equalPassword) {
            await this.prismaService.userRoles.deleteMany({where: {userId: dtoId.id}})
            const user = await this.prismaService.user.delete({ where: { login: dto.login}})
            return user;
        }
        throw new UnauthorizedException("Неверный пароль");
    }
}