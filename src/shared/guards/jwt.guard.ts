import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly _logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (err || !user) {
      const clientIp = request.headers['x-forwarded-for'];
      const requestedUrl = request.url;
      const method = request.method;
      const userAgent = request.headers['user-agent'];

      this._logger.warn(
        `Unauthorized access attempt: IP=${clientIp}, URL=${requestedUrl}, Method=${method}, User-Agent=${userAgent}`
      );

      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    return user;
  }
}
