import { CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule.register({}),
  ],
  exports: [PassportModule],
  providers: [JwtStrategy, JwtGuard],
})
export class AuthzModule {}
