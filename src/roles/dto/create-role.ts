import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateRoleDto {
    @ApiProperty({
        description: "Role",
        example: "Admin"
    })
    @IsString({message: "Должно быть строкой"})
    readonly role: string
}