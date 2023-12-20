import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import dotenv from 'dotenv';
import {Reflector} from "@nestjs/core";

dotenv.config();

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler)
    const request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decodedToken = this.jwtService.verify(token)
      const userRoles = decodedToken.roles
      const hasRole = userRoles.some((role) => roles.includes(role))
      return decodedToken && hasRole
    } catch (e) {
      return false
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
