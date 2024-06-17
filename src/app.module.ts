import { Module } from "@nestjs/common";
import {  } from "@prisma/client";
import { UserModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma.service";

@Module({
    controllers: [],
    providers: [PrismaService],
    imports: [ConfigModule.forRoot({
        envFilePath: ".env"
    }),
    UserModule]
})
export class AppModule {}