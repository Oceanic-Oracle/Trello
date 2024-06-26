import { Controller, Delete, Get, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Задачи')
@Controller('/project/:projectId/progress/:progressId/task')
export class TaskController {
    constructor(private readonly  taskService: TaskService) {}

    @Get()
    getTasks() {}

    @Post()
    createTask() {}

    @Delete()
    deleteTask() {}
}