import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserConstroller } from "./users.controller";

@Module({
    controllers: [UserConstroller],
    providers: [UserService],
    imports: []
})
export class UserModule {}