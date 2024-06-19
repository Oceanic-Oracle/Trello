import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [RolesService],
    controllers: [RolesController]
    
})
export class RolesModule {}