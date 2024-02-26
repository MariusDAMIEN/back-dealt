import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from './sessions.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly sessionsService: SessionService) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();

        const cookie = request.headers.cookie;


        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {

            const payload = await this.sessionsService.findAll(token);
            if (!payload) {
                throw new UnauthorizedException();
            }
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = request.headers.authorization;

        return token
    }
}