import { Controller, Delete, Get, Param, Post, Request} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetProjectDto } from "./dto/get-project.dto";

@ApiTags('Проекты')
@Controller('/project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @ApiOperation({summary: "Получение списка проектов"})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Get()
    async getProjects(@Request() req) {
        const projects = await this.projectService.getProjects(req);
        return projects;
    }

    @ApiOperation({summary: "Получение проекта"})
    @ApiResponse({status: 200, type: GetProjectDto})
    @ApiBearerAuth()
    @Get('/:projectId')
    async getProject(@Request() req, @Param() projectId: number) {
        const project = await this.projectService.getProject(req, projectId);
        return project;
    }

    @ApiOperation({summary: "Создание проекта"})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Post()
    async createProject(@Request() req) {
        const project = await this.projectService.createProject(req);
        return project;
    }

    @ApiOperation({summary: "Удаление проекта"})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Delete('/projectId')
    async deleteProject(@Request() req, @Param() projectId: number) {
        const project = await this.projectService.deleteProject(req, projectId);
        return project;
    }
}