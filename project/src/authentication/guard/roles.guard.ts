import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/common/enums/roles.enum';
import { UserEntity } from '../../models/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // What is the required role?
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // does the current user making the request have those required roles(s)?
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest(); // gets the user from the context. Used with authentication implemented;

    const hasRole = requiredRoles.some((role) => user?.role === role);
    if (!hasRole) {
      throw new ForbiddenException("You don't have access to this functionality.");
    }

    return hasRole;
  }
}
