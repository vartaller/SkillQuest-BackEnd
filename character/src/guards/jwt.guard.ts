import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      // const decodedToken =
      jwt.verify(token, process.env.JWT_SECRET as string);

      // if ((decodedToken as any).type !== TOKEN_TYPES.ACCESS_TOKEN) {
      //   throw new UnauthorizedException(ERRORS.AUTH.NO_ACCESS_TOKEN);
      // }

      // request.user = decodedToken;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
