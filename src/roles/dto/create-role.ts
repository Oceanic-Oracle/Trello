import { ApiProperty } from "@nestjs/swagger";


export class CreateRoleDto {
    @ApiProperty({
        description: "Role",
        example: "Admin"
    })
    readonly role: string
}