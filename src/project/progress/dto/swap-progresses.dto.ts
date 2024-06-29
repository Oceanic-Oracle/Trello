import { ApiProperty } from "@nestjs/swagger";

export class SwapProgressesDto {
    @ApiProperty({
        description: "Id first progress",
        example: "1"
    })
    readonly progress1: number;

    @ApiProperty({
        description: "Id second progress",
        example: "2"
    })
    readonly progress2: number;
}