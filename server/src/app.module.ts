import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TodoModule } from './todo/todo.module';
import { AuthzModule } from './authz/authz.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilterFilter } from './error_filter.filter';
import { HttpModule } from '@nestjs/axios';
import * as createHttpsProxyAgent from 'https-proxy-agent';

@Module({
  imports: [TodoModule, AuthzModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_FILTER, useClass: ErrorFilterFilter },
  ],
})
export class AppModule {}
