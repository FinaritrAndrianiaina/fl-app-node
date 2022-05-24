import { AuthGuard } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { isEmpty, isEqual } from 'lodash';
import { firstValueFrom, map } from 'rxjs';
import config from '../config';
import { Request } from 'express';
import { JwtPayload, UserInfo } from './interfaces/JwtPayload';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private logger = new Logger('AUTH GUARD');

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    await super.canActivate(context);
    const request = http.getRequest<Request & { user: JwtPayload }>();
    if (isEmpty(request.user) || isEmpty(request.headers.authorization)) {
      return false;
    }
    let userinfo = await this.cacheManager.get<UserInfo>(request.user.sub);
    this.logger.debug(userinfo, request.user.sub);
    if (isEmpty(userinfo)) {
      const userinfo_ = await this.fetchUserInfo(request);
      userinfo = userinfo_;
      const ok = await this.cacheManager.set<UserInfo>(
        request.user.sub,
        userinfo_,
        { ttl: 500 },
      );
      this.logger.debug(`REDIS CACHING USER ${ok}`);
      this.logger.debug(userinfo);
    }
    request.user.userinfo = userinfo;
    return true;
  }

  private async fetchUserInfo(request: Request & { user: JwtPayload }) {
    const authorization = request.headers.authorization;
    const userinfo$ = this.httpService
      .get(`${config.AUTH0_ISSUER_URL}userinfo`, {
        headers: { Authorization: authorization },
      })
      .pipe(map((r) => r.data));
    return await firstValueFrom(userinfo$);
  }
}
