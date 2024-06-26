import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RoleAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, 
            [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles || requiredRoles.length === 0) {
                return true;
            }

            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({ message: 'Отсутствует заголовок Authorization' });
            }

            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Неверный формат заголовка Authorization' });
            }

            const user = this.jwtService.verify(token);
            req.user = user;

            if (!user.roles || !Array.isArray(user.roles)) {
                throw new UnauthorizedException({ message: 'У пользователя нет ролей' });
            }
            const res = this.arrayContainsArray(user.roles, requiredRoles);
            return res;
        } catch (e) {
            throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN)
        }
    }

    private arrayContainsArray(superset: [], subset: []) {
        if (subset.length === 0) return true;
        if (superset.length < subset.length) return false;
      
        return subset.every(val => superset.includes(val));
      }
}