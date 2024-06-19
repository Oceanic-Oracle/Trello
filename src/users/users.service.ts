import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }
}