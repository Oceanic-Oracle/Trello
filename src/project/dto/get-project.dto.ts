import { ApiProperty } from "@nestjs/swagger";

export class GetProjectDto {
    @ApiProperty({
        description: "Name",
        example: "Trello"
    })
    readonly name: string;

    @ApiProperty({
        description: "Order",
        example: "1"
    })
    readonly order: number;
}