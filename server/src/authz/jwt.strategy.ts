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
      audience: 'http://localhost:3000',
      issuer: 'https://learn-auth-today.eu.auth0.com/',
      algorithms: ['RS256']
    });
    this.logger.log('INIT JWT');
  }

  validate(payload: any, done: any): any {
    this.logger.debug(payload.req);
    done(null, payload);
    return payload;
  }
}
