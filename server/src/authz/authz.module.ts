import { Module } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { pssecret } from './pssecret';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule, JwtGuard],
  providers: [JwtStrategy, JwtGuard],
})
export class AuthzModule {}
