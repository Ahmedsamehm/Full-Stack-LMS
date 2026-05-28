import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Roles } from '@prisma/client';
import { ROLES_KEY } from '../decorators/role.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector){}

   canActivate(context: ExecutionContext): boolean {
    // 1. Get required roles from decorator metadata
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. If no roles specified, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 3. Get the user from the request
    const { user } = context.switchToHttp().getRequest();

    // Safety check: Ensure user object exists (should be set by JwtAuthGuard)
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    // 4. Check if user has the required role
    const hasAccess = requiredRoles.some((role) => user.role === role);

    // 5. If no access, throw 403 Forbidden with a frontend-friendly message
    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;
  }
}