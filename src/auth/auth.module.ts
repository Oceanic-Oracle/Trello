import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/users/users.module";


@Module({
    imports: [PrismaModule, 
        JwtModule.register({ 
            secret: process.env.JWT_KEY || 'JWT_secret_key',
            signOptions: { expiresIn: '24h'}
        }),
        forwardRef(() => UserModule)
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}