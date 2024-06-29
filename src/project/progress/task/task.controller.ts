import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";

@ApiTags('Задачи')
@Controller('/project/:projectId/progress/:progressId/task')
export class TaskController {
    constructor(private readonly  taskService: TaskService) {}

    @ApiOperation({summary: "Получение задач"})
    @ApiResponse({status: 200})
    @ApiParam({ name: 'projectId', description: 'Project ID', required: false, type: Number })
    @ApiParam({ name: 'progressId', description: 'Progress ID', required: true, type: Number })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async getTasks(@Request() req: any, @Param('projectId') projectId: number, @Param('progressId') progressId: number) {
        const tasks = await this.taskService.getTasks(req, Number(projectId), Number(progressId));
        return tasks;
    }

    @ApiOperation({summary: "Создание задачи"})
    @ApiResponse({status: 200})
    @ApiParam({ name: 'projectId', description: 'Project ID', required: false, type: Number })
    @ApiParam({ name: 'progressId', description: 'Progress ID', required: true, type: Number })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    async createTask(@Request() req: any, @Param('projectId') projectId: number, @Param('progressId') progressId: number, @Body() dto: CreateTaskDto) {
        const task = await this.taskService.createTask(req, Number(projectId), Number(progressId), dto);
        return task;
    }

    @ApiOperation({summary: "Удаление задачи"})
    @ApiResponse({status: 200})
    @ApiParam({ name: 'projectId', description: 'Project ID', required: false, type: Number })
    @ApiParam({ name: 'progressId', description: 'Progress ID', required: true, type: Number })
    @ApiParam({ name: 'taskId', description: 'Task ID', required: true, type: Number })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('/:taskId')
    async deleteTask(@Request() req: any, @Param('projectId') projectId: number, @Param('progressId') progressId: number, @Param('taskId') taskId: number) {
        const task = await this.taskService.deleteTask(req, Number(projectId), Number(progressId), Number(taskId));
        return task;
    }
}