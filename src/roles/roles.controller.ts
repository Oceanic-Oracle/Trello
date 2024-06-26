import { Body, Controller, Get, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Роли')
@Controller('/roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}
    
    @ApiOperation({summary: 'Получение списка ролей'})
    @ApiResponse({status: 200, type: CreateRoleDto})
    @Get()
    async getAllRole() {
        const roles = await this.rolesService.getRoles();
        return roles;
    }

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: CreateRoleDto})
    @Post()
    async createRole(@Body() dto: CreateRoleDto) {
        const role = await this.rolesService.createRole(dto);
        return role;
    }
}