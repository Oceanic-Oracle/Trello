import { ApiProperty } from "@nestjs/swagger"

export class AuthUserDto {
    @ApiProperty({
        description: "Login",
        example: "John"
    })
    readonly login: string

    @ApiProperty({
        description: "Password",
        example: "123456"
    })
    readonly password: string
}