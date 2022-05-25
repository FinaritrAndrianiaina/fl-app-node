import { CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    HttpModule.register({}),
  ],
  exports: [PassportModule, HttpModule, UserModule],
  providers: [JwtStrategy, JwtGuard],
})
export class AuthzModule {}
