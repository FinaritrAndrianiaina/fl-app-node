import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

export class JwtGuard extends AuthGuard('jwt') {
  private logger = new Logger('GUARD');

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    this.logger.debug(req.headers);
    return super.canActivate(context);
  }
}
