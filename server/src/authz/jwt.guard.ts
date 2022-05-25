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
import { isEmpty, isEqual, keys } from 'lodash';
import { firstValueFrom, map } from 'rxjs';
import config from '../config';
import { Request } from 'express';
import { JwtPayload, UserInfo } from './interfaces/JwtPayload';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private logger = new Logger('AUTH GUARD');

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
    private userService: UserService,
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
    let userinfo = await this.cacheManager.get<UserInfo>(
      request.user['https://example.com/email'],
    );
    this.logger.debug(userinfo);
    if (isEmpty(userinfo)) {
      userinfo = await this.fetchUserInfo(request);
      await this.saveUser(userinfo);
    }
    request.user.userinfo = userinfo;
    return true;
  }

  private async saveUser(userinfo: UserInfo) {
    const ok = await this.cacheManager.set<UserInfo>(userinfo.email, userinfo, {
      ttl: 18000,
    });
    const user: User = {
      sub: userinfo.sub,
      updated_at: new Date(userinfo.updated_at),
      email: userinfo.email,
      email_verified: userinfo.email_verified,
      name: userinfo.name,
      nickname: userinfo.nickname,
      picture: userinfo.picture,
    };
    await this.userService.upsertUser(user);
    this.logger.debug(`REDIS CACHING USER ${ok}`);
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
