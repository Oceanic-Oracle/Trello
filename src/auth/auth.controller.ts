import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthUserDto } from "./dto/auth-user.dto";

@ApiTags('Пользователи')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 200, type: AuthUserDto})
    @Post('/login')
    async login(@Body() dto: AuthUserDto) {
        const user = await this.authService.loginUser(dto);
        return user;
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: CreateUserDto})
    @Post('/registration')
    async registration(@Body() dto: CreateUserDto) {
        const user = await this.authService.registrationUser(dto);
        return user;
    }
}