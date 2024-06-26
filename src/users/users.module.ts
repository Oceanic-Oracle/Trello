import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        PrismaModule, 
        forwardRef(() => AuthModule)
    ],
    providers: [UserService], 
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}