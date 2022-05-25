import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TodoModule } from './todo/todo.module';
import { AuthzModule } from './authz/authz.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilterFilter } from './error_filter.filter';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import * as redisStore from 'cache-manager-redis-store';
import { ErrorFilter } from './error.filter';

@Module({
  imports: [
    TodoModule,
    AuthzModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: { host: 'localhost', port: 6379 },
      ttl: 5,
    }),
    HttpModule.register({}),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_FILTER, useClass: ErrorFilterFilter },
  ],
})
export class AppModule {}
