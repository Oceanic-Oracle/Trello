import { ApiProperty } from "@nestjs/swagger"

export class DeleteUserDto {
    @ApiProperty({
        description: "Login",
        example: "John"
    })
    login: string

    @ApiProperty({
        description: "Password",
        example: "123456"
    })
    password: string
}