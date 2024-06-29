import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty({
        description: "Name task",
        example: "Create DB"
    })
    readonly name: string;

    @ApiProperty({
        description: "Description",
        example: "DB in Postgres"
    })
    readonly text: string;
}