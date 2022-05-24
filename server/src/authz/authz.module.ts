import { CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CacheModule.register({ ttl: 200 }),
    HttpModule.register({}),
  ],
  exports: [PassportModule],
  providers: [JwtStrategy, JwtGuard],
})
export class AuthzModule {}
