import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TodoModule } from './todo/todo.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [TodoModule, AuthzModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
