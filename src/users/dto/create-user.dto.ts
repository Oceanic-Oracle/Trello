import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "Login",
        example: "John"
    })
    @IsString({message: "Должно быть строкой"})
    readonly login: string;

    @ApiProperty({
        description: "Password",
        example: "123456"
    })
    @IsString({message: "Должно быть строкой"})
    readonly password: string;

    @ApiProperty({
        description: "User",
        example: "1"
    })
    @IsNumber({}, {message: "Должно быть числом"})
    readonly roleID: number;
}