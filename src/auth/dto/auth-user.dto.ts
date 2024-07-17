import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class AuthUserDto {
    @ApiProperty({
        description: "Login",
        example: "John"
    })
    @IsString({message: "Должно быть строкой"})
    readonly login: string

    @ApiProperty({
        description: "Password",
        example: "123456"
    })
    @IsString({message: "Должно быть строкой"})
    @Length(6, 16, {message: "Пароль должен содержать от 6 до 16 символов"})
    readonly password: string
}