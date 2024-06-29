import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        PrismaModule, 
        forwardRef(() => AuthModule),
        JwtModule.register({ 
            secret: process.env.JWT_KEY || 'JWT_secret_key',
            signOptions: { expiresIn: '24h'}
        }),
    ],
    providers: [UserService], 
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}