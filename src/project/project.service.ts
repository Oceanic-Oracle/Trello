import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProjectService {
    constructor(private readonly prismaService: PrismaService, 
                private readonly jwtService: JwtService
    ) {}

    async getProjects(req) {
        const userId = await this.tokenUserId(req);
        const projects = await this.prismaService.project.findMany({
            include: {
                progress: {
                    include: {
                        task: {
                            where: {
                                userId: userId
                            }
                        }
                    }
                }
            }
        });
        return projects;
    }

    async getProject(req, projectId: number) {
        const userId = await this.tokenUserId(req);
        const project = await this.prismaService.project.findFirst({
            where: {id: projectId},
            include: {
                progress: {
                    include: {
                        task: {
                            where: {
                                userId: userId
                            }
                        }
                    }
                }
            }
        })
        return project;
    }

    async createProject(req) {
        //TODO
    }
    
    async deleteProject(req, projectId: number) {
        const userId = await this.tokenUserId(req);
        const project = await this.prismaService.project.delete({
            where: {id: projectId},
            include: {
                progress: {
                    include: {
                        task: {
                            where: { userId: userId}
                        }
                    }
                }
            }
        })
        return project;
    }

    private async tokenUserId(req) {
        const token = await req.headers.authorization.split[1];
        const user = await this.jwtService.verify(token);
        return user.id;
    }
}