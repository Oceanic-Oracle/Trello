import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProgressService } from "./progress/progress.service";
import { TaskService } from "./progress/task/task.service";
import { ProgressController } from "./progress/progress.controller";
import { TaskController } from "./progress/task/task.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({ 
            secret: process.env.JWT_KEY || 'JWT_secret_key',
            signOptions: { expiresIn: '24h'}
        })
    ],
    controllers: [ProjectController, ProgressController, TaskController],
    providers: [ProjectService, ProgressService, TaskService]
})
export class ProjectModule {}