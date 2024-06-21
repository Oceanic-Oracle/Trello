import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/users/users.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService, 
        private readonly jwtService: JwtService, 
        private readonly userService: UserService
    ) {}

    async loginUser(dto: AuthUserDto) {
        const user = await this.prismaService.user.findUnique({where: {login: dto.login}});
        const equalPassword = bcrypt.compare(dto.password, user.password);

        if(user && equalPassword) {
            return await this.generateToken(user);
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }

    async registrationUser(dto: CreateUserDto) {
        const { login, password } = dto;

        if (await this.findUserByLogin(login)) {
            throw new HttpException('Пользователь с таким именем существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const dtoHash = { login: dto.login, password: hashPassword, roleID: dto.roleID };
        const res = await this.userService.createUser(dtoHash);
        return await this.generateToken(res);
    }

    private async findUserByLogin(login: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({ where: { login: login } });
        return user;
    }

    private async generateToken(user: User) {
        const findUserRoles = await this.prismaService.user.findUnique({
            where: { login: user.login }, 
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!findUserRoles) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        const payload = {
            id: findUserRoles.id,
            login: findUserRoles.login,
            password: findUserRoles.password,
            roles: findUserRoles.userRoles.map(userRole => userRole.role.role)
        };

        return { "token": this.jwtService.sign(payload) };
    }
}