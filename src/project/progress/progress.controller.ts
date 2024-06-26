import { Controller, Delete, Get, Post } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Прогресс')
@Controller('/project/:projectId/progress') 
export class ProgressController {
    constructor(private readonly progressService: ProgressService) {}

    @Get()
    getProgresses() {
        const progresses = this.progressService.getProgresses();
        return progresses;
    }

    @Post()
    createProgress() {
        const progress = this.progressService.createProgress();
        return progress;
    }

    @Delete()
    deleteProgress() {
        const progress = this.progressService.deleteProgress();
        return progress;
    }
}