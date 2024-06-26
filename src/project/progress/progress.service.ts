import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProgressService {
    constructor(private readonly prismaService: PrismaService) {}

    getProgresses() {}

    createProgress() {}

    deleteProgress() {}
}