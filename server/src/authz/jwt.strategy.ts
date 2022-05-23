import { Injectable, Logger } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import config from '../config';
import { pssecret } from './pssecret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger('JWT');
  constructor() {
    super({
      secretOrKeyProvider: pssecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.AUTH0_AUDIENCE,
      issuer: `${config.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
    this.logger.log('INIT JWT');
  }

  validate(payload: any, done: any): any {
    done(null, payload);
    this.logger.debug(payload.req);
    return payload;
  }
}
