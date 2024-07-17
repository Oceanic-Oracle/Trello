import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class DeleteUserDto {
    @ApiProperty({
        description: "Login",
        example: "John"
    })
    @IsString({message: "Должно быть строкой"})
    login: string

    @ApiProperty({
        description: "Password",
        example: "123456"
    })
    @IsNumber({}, {message: "Должно быть числом"})
    password: string
}