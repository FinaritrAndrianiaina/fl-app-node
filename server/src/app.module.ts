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
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TodoModule,
    AuthzModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: { host: 'localhost', port: 6379 },
      ttl: 6,
    }),
    HttpModule.register({}),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_FILTER, useClass: ErrorFilterFilter },
  ],
})
export class AppModule {}
