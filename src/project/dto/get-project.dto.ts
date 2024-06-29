import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({
        description: "Name",
        example: "Trello"
    })
    readonly name: string;
}