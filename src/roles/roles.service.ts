import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "./dto/create-role";

@Injectable()
export class RolesService{
    constructor(private readonly prismaService: PrismaService) {}

    async getRoles(): Promise<Role[]> {
        const roles = await this.prismaService.role.findMany();
        return roles;
    }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = await this.prismaService.role.create({data: {role: dto.role}});
        return role;
    }
}